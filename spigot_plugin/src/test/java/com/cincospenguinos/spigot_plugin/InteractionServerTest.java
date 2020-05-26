package com.cincospenguinos.spigot_plugin;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import java.io.IOException;
import java.net.Socket;

import static org.junit.Assert.*;

public class InteractionServerTest {
    private InteractionServer server;
    private static final int TEST_PORT = 25567;

    @Before
    public void setup() {
        server = new InteractionServer(null, TEST_PORT);
        server.start();
        rest();
    }

    @After
    public void teardown() {
        server.stop();
    }

    @Test
    public void serverAcceptsConnection() {
        try {
            new Socket("localhost", TEST_PORT);
        } catch (IOException e) {
            fail();
        }
    }

    private void rest() {
        try {
            Thread.sleep(100L);
        } catch (InterruptedException e) {
            fail();
        }
    }
}