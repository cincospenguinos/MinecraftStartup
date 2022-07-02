package com.cincospenguinos.spigot_plugin.discord;

public class DiscordLoginException extends RuntimeException {
    DiscordLoginException() {
        super("Could not login as the discord bot!");
    }
}
