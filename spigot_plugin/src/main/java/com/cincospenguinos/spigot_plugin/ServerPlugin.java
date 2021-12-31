package com.cincospenguinos.spigot_plugin;

import com.cincospenguinos.spigot_plugin.discord.DiscordBot;
import org.bukkit.Chunk;
import org.bukkit.Server;
import org.bukkit.configuration.file.FileConfiguration;
import org.bukkit.entity.Entity;
import org.bukkit.entity.minecart.StorageMinecart;
import org.bukkit.event.EventHandler;
import org.bukkit.event.Listener;
import org.bukkit.event.entity.EntityPlaceEvent;
import org.bukkit.event.world.EntitiesLoadEvent;
import org.bukkit.event.world.EntitiesUnloadEvent;
import org.bukkit.plugin.java.JavaPlugin;

import java.util.HashSet;
import java.util.Map;
import java.util.Set;
import java.util.logging.Logger;

// TODO: Add minecart chunk loading behavior as well

public class ServerPlugin extends JavaPlugin implements ServerInfoSource {
    public static final int SERVER_PLUGIN_PORT = 25566;
    private final FileConfiguration configuration = getConfig();
    private InteractionServer interactionServer;
    private DiscordBot bot;

    public class MinecartShippingListener implements Listener {
        @EventHandler
        public void onEntitiesUnloadEvent(EntitiesUnloadEvent event) {
            for (Entity e : event.getEntities()) {
                if (e instanceof StorageMinecart) {
                    getLogger().info(">>> Cart was unloaded!");
                    getServer().getPlayer("cincospenguinos").sendMessage(">>> Cart was unloaded!");
                }
            }
        }

        @EventHandler
        public void onStorageCartLoadEvent(EntitiesLoadEvent event) {
            for (Entity e : event.getEntities()) {
                if (e instanceof StorageMinecart) {
                    getLogger().info(">>> Cart was loaded!");
                    getServer().getPlayer("cincospenguinos").sendMessage(">>> Cart was placed!");
                }
            }
        }

        @EventHandler
        public void onEntityPlacedEvent(EntityPlaceEvent event) {
            Entity e = event.getEntity();
            if (e instanceof StorageMinecart) {
                getLogger().info(">>> Cart was placed!");
                getServer().getPlayer("cincospenguinos").sendMessage(">>> Cart was placed!");
            }
        }
    }

    @Override
    public void onEnable() {
        configuration.addDefault("port", SERVER_PLUGIN_PORT);
        configuration.options().copyDefaults(true);
        saveConfig();

        String botToken = configuration.getString("discord_bot_token");
        String channelName = configuration.getString("discord_channel_id");

        if (botToken == null || channelName == null) {
            getLogger().warning("No discord bot token provided! Will not be able to integrate with Discord!");
        } else {
            bot = new DiscordBot(botToken, channelName);
            if (bot.login()) {
                bot.sendMessage("@everyone The server is up! Come on in and join the fun!");
            } else {
                getLogger().warning("Could not login as Discord bot!");
            }
        }

        startServer();

        getServer().getPluginManager().registerEvents(new MinecartShippingListener(), this);
    }

    private void startServer() {
        int port = getConfig().getInt("port");
        interactionServer = new InteractionServer(this, port);
        interactionServer.setLogger(getLogger());
        interactionServer.start();
        getLogger().info("Interaction server is up");
    }

    @Override
    public void onDisable() {
        interactionServer.stop();
        getLogger().info("Interaction server stopped");
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
