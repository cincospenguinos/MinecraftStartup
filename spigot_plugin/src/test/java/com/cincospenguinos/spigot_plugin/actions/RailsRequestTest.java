package com.cincospenguinos.spigot_plugin.actions;

import org.junit.Test;

import static org.junit.Assert.*;

public class RailsRequestTest {

    @Test
    public void forMessage_statusReturnsStatusRequest() {
        assertTrue(RailsRequest.forMessage("status") instanceof StatusRequest);
    }

    @Test
    public void forMessage_garbageReturnsNullRequestObject() {
        assertNotNull(RailsRequest.forMessage("gobbledigook"));
    }

    @Test
    public void forMessage_playersReturnsPlayersRequestObject() {
        assertTrue(RailsRequest.forMessage("players") instanceof PlayerCountRequest);
    }
}