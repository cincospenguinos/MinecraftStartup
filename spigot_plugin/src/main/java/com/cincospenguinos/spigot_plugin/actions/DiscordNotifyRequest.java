package com.cincospenguinos.spigot_plugin.actions;

import com.cincospenguinos.spigot_plugin.ServerInfoSource;

public class DiscordNotifyRequest extends RailsRequest {
    private String response;

    public DiscordNotifyRequest() {
        response = "ERROR";
    }

    @Override
    public boolean isValid() {
        return true;
    }

    @Override
    public String response() {
        return response;
    }

    @Override
    public void process(ServerInfoSource source) {
        source.notifyDiscordRequest();
    }
}
