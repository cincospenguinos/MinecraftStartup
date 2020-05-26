package com.cincospenguinos.spigot_plugin.actions;

import com.cincospenguinos.spigot_plugin.ServerInfoSource;

public class StatusRequest extends RailsRequest {
    public StatusRequest() {}

    @Override
    public boolean isValid() {
        return true;
    }

    @Override
    public String response() {
        return "OK";
    }

    @Override
    public void process(ServerInfoSource source) {}
}
