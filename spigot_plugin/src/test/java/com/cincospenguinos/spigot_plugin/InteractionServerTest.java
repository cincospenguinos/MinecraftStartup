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
        server.stop();
    }

    private void rest() {
        try {
            Thread.sleep(500L);
        } catch (InterruptedException e) {
            fail();
        }
    }

    @Test
    public void serverUnderstandsStatus() {
        String response = sendMessageToServer("status");
        assertEquals("OK", response);
    }

    @Test
    public void serverDoesNotUnderstandGobbledigook() {
        String response = sendMessageToServer("GOBBLEDIGOOK");
        assertEquals("ERROR", response);
    }

    private String sendMessageToServer(String message) {
        try {
            Socket socket = new Socket("localhost", TEST_PORT);
            PrintWriter out = new PrintWriter(socket.getOutputStream(), true);
            BufferedReader in = new BufferedReader(new InputStreamReader(socket.getInputStream()));

            out.println(message);
            String response = in.readLine();
            socket.close();

            return response;
        } catch (IOException e) {
            fail();
        }

        return null;
    }
}