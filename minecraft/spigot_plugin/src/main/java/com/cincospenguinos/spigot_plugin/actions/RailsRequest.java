package com.cincospenguinos.spigot_plugin.actions;

import com.cincospenguinos.spigot_plugin.ServerInfoSource;

public abstract class RailsRequest {
    public abstract boolean isValid();
    public abstract String response();
    public abstract void process(ServerInfoSource source);

    public static RailsRequest forMessage(String message) {
        if (message == null) {
            return new NullRequest();
        }

        if (message.equals("status")) {
            return new StatusRequest();
        }

        if (message.equals("players")) {
            return new PlayerCountRequest();
        }

        if (message.equals("stop")) {
            return new StopServerRequest();
        }

        if (message.equals("notify")) {
            return new DiscordNotifyRequest();
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

        @Override
        public void process(ServerInfoSource source) {}
    }
}
