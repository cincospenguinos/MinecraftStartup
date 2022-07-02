package com.cincospenguinos.spigot_plugin.discord;

import net.dv8tion.jda.api.JDA;
import net.dv8tion.jda.api.JDABuilder;
import net.dv8tion.jda.api.entities.TextChannel;

import javax.security.auth.login.LoginException;

public class DiscordBot {
    private JDA jda;
    private String channelName;
    private String botToken;

    public DiscordBot(String _botToken, String _channelName) {
        botToken = _botToken;
        channelName = _channelName;
    }

    public boolean login() {
        try {
            jda = JDABuilder.createDefault(botToken).build();
            jda.awaitReady();
        } catch (LoginException | InterruptedException e) {
            return false;
        }

        return true;
    }

    public boolean isLoggedIn() {
        return jda != null;
    }

    public void setJDA(JDA _jda) {
        jda = _jda;
    }

    public boolean sendMessage(String message) {
        if (isLoggedIn()) {
            for (TextChannel t : jda.getTextChannels()) {
                if (t.getName().equals(channelName)) {
                    t.sendMessage(message).queue();
                    return true;
                }
            }
        }

        return false;
    }
}
