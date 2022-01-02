package com.cincospenguinos.spigot_plugin;

import org.bukkit.*;
import org.bukkit.command.BlockCommandSender;
import org.bukkit.command.Command;
import org.bukkit.command.CommandExecutor;
import org.bukkit.command.CommandSender;
import org.bukkit.enchantments.Enchantment;
import org.bukkit.entity.Entity;
import org.bukkit.entity.EntityType;
import org.bukkit.entity.Item;
import org.bukkit.entity.Player;
import org.bukkit.inventory.ItemStack;
import org.bukkit.inventory.meta.EnchantmentStorageMeta;
import org.bukkit.inventory.meta.ItemMeta;
import org.jetbrains.annotations.NotNull;

import java.util.*;
import java.util.logging.Logger;
import java.util.stream.Collectors;

public class ExtractEnchantmentCommand implements CommandExecutor {
    private static final double SEARCH_RADIUS = 2.0;

    private final Logger logger;

    public ExtractEnchantmentCommand(Logger _logger) {
        logger = _logger;
    }

    @Override
    public boolean onCommand(@NotNull CommandSender commandSender, @NotNull Command command, @NotNull String s, @NotNull String[] strings) {
        if (commandSender instanceof Player || commandSender instanceof Server) {
            commandSender.sendMessage(ChatColor.RED + "This command is limited to command blocks only.");
            return true;
        }

        Location location = ((BlockCommandSender) commandSender).getBlock().getLocation();
        Location dropLocation = location.clone().add(0.0, SEARCH_RADIUS, 0.0);
        World world = location.getWorld();

        if (world == null) {
            logger.warning("No world was found! This command cannot operate without a world!");
            commandSender.sendMessage(ChatColor.RED + "No world was found! This command cannot operate without a world!");
            return true;
        }

        Collection<Entity> nearbyEntities = location.getWorld().getNearbyEntities(location, SEARCH_RADIUS, SEARCH_RADIUS, SEARCH_RADIUS);

        List<Entity> players = nearbyEntities.stream().filter(e -> e.getType().equals(EntityType.PLAYER)).collect(Collectors.toList());
        if (players.size() != 1) {
            players.forEach(p -> p.sendMessage(ChatColor.RED + "Found multiple players in range! Must be alone to use."));
            logger.warning("Found multiple players in range! Must be alone to use.");
            return true;
        }

        for (Entity e : nearbyEntities) {
            if (e.getType().equals(EntityType.DROPPED_ITEM)) {
                Item itemInQuestion = (Item) e;

                if (itemInQuestion.getItemStack().getEnchantments().size() > 0) {
                    Set<Map.Entry<Enchantment, Integer>> entrySet = itemInQuestion.getItemStack().getEnchantments().entrySet();

                    for (Map.Entry<Enchantment, Integer> enchantmentEntry : entrySet) {
                        ItemStack enchantedBook = new ItemStack(Material.ENCHANTED_BOOK);
                        assert enchantedBook.getItemMeta() != null;
                        EnchantmentStorageMeta meta = (EnchantmentStorageMeta) enchantedBook.getItemMeta();
                        meta.addStoredEnchant(enchantmentEntry.getKey(), enchantmentEntry.getValue(), true);1:x

                        enchantedBook.setItemMeta(meta);
                        location.getWorld().dropItem(dropLocation, enchantedBook);
                    }

                    itemInQuestion.remove();
                }
            }
        }

        return true;
    }
}
