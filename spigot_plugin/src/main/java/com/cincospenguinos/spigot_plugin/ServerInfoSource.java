package com.cincospenguinos.spigot_plugin;

import java.io.IOException;

public interface ServerInfoSource {
    public int queryNumberPlayers();
    public void notifyStopRequest();
    public void notifyDiscordRequest();
}
