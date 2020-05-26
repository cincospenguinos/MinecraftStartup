package com.cincospenguinos.spigot_plugin.actions;

public abstract class RailsRequest {
    public abstract boolean isValid();
    public abstract String response();

    public static RailsRequest forMessage(String message) {
        if (message == null) {
            return new NullRequest();
        }

        if (message.equals("status")) {
            return new StatusRequest();
        }

        return new NullRequest();
    }

    private static class NullRequest extends RailsRequest {

        @Override
        public boolean isValid() {
            return false;
        }

        @Override
        public String response() {
            return "ERROR";
        }
    }
}
