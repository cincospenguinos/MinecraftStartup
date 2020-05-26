package com.cincospenguinos.spigot_plugin;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
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
            Socket socket = new Socket("localhost", TEST_PORT);
            socket.close();
        } catch (IOException e) {
            fail();
        }
    }

    @Test
    public void serverUnderstandsStatus() {
        server.stop(); // This will prevent the thread from continuing after our test

        try {
            Socket socket = new Socket("localhost", TEST_PORT);
            PrintWriter out = new PrintWriter(socket.getOutputStream(), true);
            BufferedReader in = new BufferedReader(new InputStreamReader(socket.getInputStream()));

            out.println("status");
            String response = in.readLine();
            assertEquals("OK", response);
        } catch (IOException e) {
            fail();
        }
    }

    private void rest() {
        try {
            Thread.sleep(500L);
        } catch (InterruptedException e) {
            fail();
        }
    }
}