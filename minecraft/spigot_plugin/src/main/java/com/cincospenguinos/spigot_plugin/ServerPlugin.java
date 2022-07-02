package com.cincospenguinos.spigot_plugin;

import com.cincospenguinos.spigot_plugin.discord.DiscordBot;
import org.bukkit.Server;
import org.bukkit.configuration.file.FileConfiguration;
import org.bukkit.plugin.java.JavaPlugin;

// TODO: Add minecart chunk loading behavior as well

public class ServerPlugin extends JavaPlugin implements ServerInfoSource {
    public static final int SERVER_PLUGIN_PORT = 25566;
    private final FileConfiguration configuration = getConfig();
    private InteractionServer interactionServer;
    private DiscordBot bot;

    @Override
    public void onEnable() {
        configuration.addDefault("port", SERVER_PLUGIN_PORT);
        configuration.options().copyDefaults(true);
        saveConfig();
        setupExtractEnchantmentCommand();
        startServer();
    }

    private void setupExtractEnchantmentCommand() {
        this.getCommand("extract_enchantments").setExecutor(new ExtractEnchantmentCommand(getLogger()));
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

    @Override
    public void notifyDiscordRequest() {
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
    }
}
