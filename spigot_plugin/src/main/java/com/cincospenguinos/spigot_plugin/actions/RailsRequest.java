package com.cincospenguinos.spigot_plugin.actions;

public abstract class RailsRequest {
    public abstract boolean isValid();

    public static RailsRequest forMessage(String message) {
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
    }
}
