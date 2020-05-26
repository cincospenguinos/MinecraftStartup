package com.cincospenguinos.spigot_plugin;

import org.bukkit.Server;
import org.bukkit.plugin.java.JavaPlugin;

public class ServerPlugin extends JavaPlugin implements ServerInfoSource {
    private InteractionServer interactionServer;

    @Override
    public void onEnable() {
        interactionServer = new InteractionServer(this, 25566); // TODO: Make this port configuraable
        interactionServer.setLogger(getLogger());
        interactionServer.start();
        getLogger().info("Enabled!");
    }

    @Override
    public void onDisable() {
        getLogger().info("Disabled!");
    }

    @Override
    public int queryNumberPlayers() {
        return getServer().getOnlinePlayers().size();
    }

    @Override
    public void notifyStopRequest() {
        Server server = getServer();
        server.broadcastMessage("SERVER IS SHUTTING DOWN");
        server.shutdown();

        interactionServer.stop();
    }
}
