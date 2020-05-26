package com.cincospenguinos.spigot_plugin;

import java.io.IOException;

public interface InteractionEventListener {
    public void interactionOccurred(String message);
    public void socketClosed(Exception reason);
}
