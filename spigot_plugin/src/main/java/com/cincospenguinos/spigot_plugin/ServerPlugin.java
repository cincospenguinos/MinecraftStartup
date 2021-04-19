package com.cincospenguinos.spigot_plugin;

import net.dv8tion.jda.api.JDA;
import net.dv8tion.jda.api.JDABuilder;
import org.bukkit.Server;
import org.bukkit.configuration.file.FileConfiguration;
import org.bukkit.plugin.java.JavaPlugin;

import javax.security.auth.login.LoginException;

public class ServerPlugin extends JavaPlugin implements ServerInfoSource {
    public static final int SERVER_PLUGIN_PORT = 25566;
    private final FileConfiguration configuration = getConfig();
    private InteractionServer interactionServer;

    @Override
    public void onEnable() {
        configuration.addDefault("port", SERVER_PLUGIN_PORT);
        configuration.options().copyDefaults(true);
        saveConfig();

        String botToken = configuration.getString("discord_bot_token");

        if (botToken == null) {
            getLogger().info("No discord bot token provided! Will not be able to integrate with Discord!");
        } else {
            try {
                JDABuilder.createDefault(botToken).build();
                getLogger().info("Created bot connection");
            } catch (LoginException e) {
                e.printStackTrace();
                getLogger().info("Could not login as bot!");
            }
        }

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
