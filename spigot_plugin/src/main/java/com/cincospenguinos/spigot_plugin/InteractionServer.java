package com.cincospenguinos.spigot_plugin;

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
    private InteractionEventListener listener;
    private int port;

    private AtomicBoolean keepRunning;
    private Thread workerThread;

    private static final long INTERVAL = 10L;

    InteractionServer(InteractionEventListener _listener, int _port) {
        listener = _listener;
        port = _port;
        keepRunning = new AtomicBoolean(true);
    }

    @Override
    public void run() {
        while (keepRunning.get()) {
            rest();

            try {
                ServerSocket socket = new ServerSocket(port);
                Socket client = socket.accept();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

    private void rest() {
        try {
            Thread.sleep(INTERVAL);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }

    public void stop() {
        keepRunning.set(false);
    }

    public void start() {
        workerThread = new Thread(this);
        workerThread.start();
    }
}