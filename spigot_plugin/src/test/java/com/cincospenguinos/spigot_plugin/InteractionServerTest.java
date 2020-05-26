package com.cincospenguinos.spigot_plugin;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import java.io.IOException;
import java.net.Socket;

import static org.junit.Assert.*;

public class InteractionServerTest {
    private InteractionServer server;

    @Before
    public void setup() {
        server = new InteractionServer(null, 25566);
        server.start();
    }

    @After
    public void teardown() {
        server.stop();
    }

    @Test
    public void serverAcceptsConnection() {
        try {
            Thread.sleep(100L);
            new Socket("localhost", 25566);
        } catch (IOException | InterruptedException e) {
            fail();
        }
    }
}