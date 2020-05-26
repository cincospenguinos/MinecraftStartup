package com.cincospenguinos.spigot_plugin.actions;

import com.cincospenguinos.spigot_plugin.ServerInfoSource;

public class PlayerCountRequest extends RailsRequest {
    private String response;

    public PlayerCountRequest() {
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
        response = Integer.toString(source.queryNumberPlayers());
    }
}
