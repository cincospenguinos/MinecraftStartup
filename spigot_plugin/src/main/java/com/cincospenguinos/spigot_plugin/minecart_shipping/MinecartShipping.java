package com.cincospenguinos.spigot_plugin.minecart_shipping;

import org.bukkit.Chunk;
import org.bukkit.Location;
import org.bukkit.World;
import org.bukkit.entity.Entity;
import org.bukkit.entity.minecart.StorageMinecart;

import java.util.*;
import java.util.logging.Logger;
import java.util.stream.Collectors;

/**
 * Keeps minecarts with boxes and the chunks surrounding them loaded. This will be a dramatic hit to performance, but
 * will make sure that the minecart shipping setup I've got work properly.
 */
public class MinecartShipping {
    private World world;
    private Logger logger;
    private List<Entity> shippingMinecarts;
    private Map<Entity, Set<Chunk>> forcedChunks;
    private final Object mutex;

    public MinecartShipping(World _world, Logger _logger) {
        world = _world;
        logger = _logger;
        forcedChunks = new HashMap<>();
        shippingMinecarts = world.getEntities()
                .stream()
                .filter(e -> e instanceof StorageMinecart)
                .collect(Collectors.toList());
        mutex = new Object();
        logger.info(">>> Found " + shippingMinecarts.size() + " shipping minecarts.");
    }

    public void register(StorageMinecart cart) {
        synchronized (mutex) {
            shippingMinecarts.add(cart);
        }
    }

    public void remove(StorageMinecart cart) {
        synchronized (mutex) {
            forcedChunks.remove(cart);
            shippingMinecarts.remove(cart);
        }
    }

    public void tick() {
        shippingMinecarts.parallelStream()
            .forEach(cart -> {
                boolean isMoving = cart.getVelocity().lengthSquared() > 0.0;

                if (isMoving) {
                    Location location = cart.getLocation();
                    int x = location.getBlockX();
                    int z = location.getBlockZ();

                    Set<Chunk> chunkSet;
                    synchronized (mutex) {
                        chunkSet = getSetFor(cart);
                    }

                    for (Chunk c : getChunksAround(x, z)) {
                        c.setForceLoaded(true);
                        chunkSet.add(c);
                    }

                    synchronized (mutex) {
                        forcedChunks.put(cart, chunkSet);
                    }
                } else if (forcedChunks.containsKey(cart)) {
                    for (Chunk c : forcedChunks.get(cart)) {
                        c.setForceLoaded(false);
                    }

                    synchronized (mutex) {
                        forcedChunks.remove(cart);
                    }
                }
            });
    }

    private Set<Chunk> getSetFor(Entity cart) {
        if (forcedChunks.containsKey(cart)) {
            return forcedChunks.get(cart);
        }

        return new HashSet<>();
    }

    private List<Chunk> getChunksAround(int x, int z) {
        List<Chunk> chunks = new LinkedList<>();

        chunks.add(world.getChunkAt(x, z));
        chunks.add(world.getChunkAt(x - 1, z));
        chunks.add(world.getChunkAt(x + 1, z));
        chunks.add(world.getChunkAt(x, z - 1));
        chunks.add(world.getChunkAt(x, z + 1));

        return chunks;
    }
}
