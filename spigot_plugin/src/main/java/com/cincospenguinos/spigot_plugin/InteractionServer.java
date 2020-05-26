package com.cincospenguinos.spigot_plugin;

import com.cincospenguinos.spigot_plugin.actions.RailsRequest;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.ServerSocket;
import java.net.Socket;
import java.util.concurrent.atomic.AtomicBoolean;

/**
 * The server that handles interaction between Rails's rake task to check the status of the server and the client.
 *
 * The protocol is as follows:
 *
 * 1. A client connects with this server on the port it is listening on. The server accepts that connection.
 * 2. The client submits their message as a string. If the server does not understand it, it will respond with "ERROR".
 * 3. If the server understands the message, it will either perform the task and respond with "OK", or it will provide
 *    the data requested in the expected format
 */
public class InteractionServer implements Runnable {
    private final ServerInfoSource infoSource;
    private final int port;

    private final AtomicBoolean keepRunning;

    private static final long INTERVAL = 10L;

    InteractionServer(ServerInfoSource _infoSource, int _port) {
        infoSource = _infoSource;
        port = _port;
        keepRunning = new AtomicBoolean(true);
    }

    @Override
    public void run() {
        try {
            ServerSocket socket = new ServerSocket(port);

            while (keepRunning.get()) {
                rest();

                Socket client = socket.accept();
                RailsRequest request = getRequestFrom(client);
                request.process(infoSource);
                submitResponseTo(client, request);
                client.close();
            }
        } catch (IOException e) {
            e.printStackTrace();
            keepRunning.set(false);
        }
    }

    private void rest() {
        try {
            Thread.sleep(INTERVAL);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }

    private RailsRequest getRequestFrom(Socket client) throws IOException {
        BufferedReader in = new BufferedReader(new InputStreamReader(client.getInputStream()));
        String message = in.readLine();

        return RailsRequest.forMessage(message);
    }

    private void submitResponseTo(Socket client, RailsRequest processedRequest) throws IOException {
        PrintWriter out = new PrintWriter(client.getOutputStream(), true);
        out.println(processedRequest.response());
    }

    public void stop() {
        keepRunning.set(false);
    }

    public void start() {
        new Thread(this).start();
    }
}
