package com.cincospenguinos.spigot_plugin;

import org.bukkit.plugin.java.JavaPlugin;

public class ServerPlugin extends JavaPlugin {

    @Override
    public void onEnable() {
        getLogger().info("Enabled!");
    }

    @Override
    public void onDisable() {
        getLogger().info("Disabled!");
    }
}
