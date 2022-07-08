package com.cincospenguinos.spigot_plugin;

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
    private static final int TEST_PORT = 29999;

    @Before
    public void setup() {
        ServerInfoSource serverInfo = new MockServerInfoSource();
        server = new InteractionServer(serverInfo, TEST_PORT);
        server.start();
        rest();
    }

    private void rest() {
        try {
            Thread.sleep(90L);
        } catch (InterruptedException e) {
            fail();
        }
    }

    @Test
    public void serverUnderstandsStatus() {
        String response = sendMessageToServer("status");
        assertEquals("ONLINE", response);
    }

    @Test
    public void serverDoesNotUnderstandGobbledigook() {
        String response = sendMessageToServer("GOBBLEDIGOOK");
        assertEquals("ERROR", response);
    }

    @Test
    public void serverRespondsWithNumberOfPlayers() {
        String response = sendMessageToServer("players");
        assertNotNull(response);
        int playerCount = Integer.parseInt(response);
        assertEquals(MockServerInfoSource.NUM_PLAYERS, playerCount);
    }

    @Test
    public void serverRespondsToStopRequest() {
        String response = sendMessageToServer("stop");
        rest();
        assertEquals("OK", response);
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

    private static class MockServerInfoSource implements ServerInfoSource {
        static final int NUM_PLAYERS = 3;

        @Override
        public int queryNumberPlayers() {
            return NUM_PLAYERS;
        }

        @Override
        public void notifyStopRequest() {}

        @Override
        public void notifyDiscordRequest() {}
    }
}