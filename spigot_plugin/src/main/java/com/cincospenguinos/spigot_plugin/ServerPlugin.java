package com.cincospenguinos.spigot_plugin;

import org.bukkit.Server;
import org.bukkit.configuration.file.FileConfiguration;
import org.bukkit.plugin.java.JavaPlugin;

public class ServerPlugin extends JavaPlugin implements ServerInfoSource {
    private final FileConfiguration configuration = getConfig();
    private InteractionServer interactionServer;

    @Override
    public void onEnable() {
        configuration.addDefault("port", 25566);
        configuration.options().copyDefaults(true);
        saveConfig();
        startServer();
    }

    private void startServer() {
        int port = getConfig().getInt("port");
        interactionServer = new InteractionServer(this, port);
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
