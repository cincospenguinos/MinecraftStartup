package com.cincospenguinos.spigot_plugin;

public interface ServerInfoSource {
    public int queryNumberPlayers();
    public void notifyStopRequest();
    public void notifyDiscordRequest();
}
