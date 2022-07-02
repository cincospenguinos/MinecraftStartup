package com.cincospenguinos.spigot_plugin.discord;

import junit.framework.TestCase;
import net.dv8tion.jda.api.AccountType;
import net.dv8tion.jda.api.JDA;
import net.dv8tion.jda.api.Permission;
import net.dv8tion.jda.api.entities.*;
import net.dv8tion.jda.api.exceptions.RateLimitedException;
import net.dv8tion.jda.api.hooks.IEventManager;
import net.dv8tion.jda.api.managers.AudioManager;
import net.dv8tion.jda.api.managers.ChannelManager;
import net.dv8tion.jda.api.managers.DirectAudioController;
import net.dv8tion.jda.api.managers.Presence;
import net.dv8tion.jda.api.requests.GatewayIntent;
import net.dv8tion.jda.api.requests.RestAction;
import net.dv8tion.jda.api.requests.restaction.*;
import net.dv8tion.jda.api.sharding.ShardManager;
import net.dv8tion.jda.api.utils.AttachmentOption;
import net.dv8tion.jda.api.utils.cache.CacheView;
import net.dv8tion.jda.api.utils.cache.SnowflakeCacheView;
import okhttp3.OkHttpClient;
import org.jetbrains.annotations.NotNull;
import org.jetbrains.annotations.Nullable;
import org.junit.Assert;
import org.junit.Test;

import java.io.File;
import java.io.InputStream;
import java.util.*;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;
import java.util.function.BiConsumer;
import java.util.function.BooleanSupplier;
import java.util.function.Consumer;

public class DiscordBotTest {
    @Test
    public void test_discordBotInstantiates() {
        new DiscordBot("BotToken", "ChannelName");
    }

    @Test
    public void test_discordBotIndicatesValidLogin() {
        DiscordBot bot = new DiscordBot("BotToken", "ChannelName");
        Assert.assertFalse(bot.login());
        Assert.assertFalse(bot.isLoggedIn());
    }

    @Test
    public void test_discordBotSubmitsMessageToCorrectChannel() {
        MockJDA jda = new MockJDA("minecraft");
        DiscordBot bot = new DiscordBot("BotToken", "minecraft");
        bot.setJDA(jda);
        Assert.assertTrue(bot.isLoggedIn());
        Assert.assertTrue(bot.sendMessage("@everyone YO"));

        MockJDA.MockTextChannel channel = (MockJDA.MockTextChannel) jda.getTextChannels().get(0);
        Assert.assertTrue(channel.getLastMessageAction().isQueued());
    }

    @Test
    public void test_discordBotDoesNotSubmitMessageToIncorrectChannel() {
        MockJDA jda = new MockJDA("minecraft");
        DiscordBot bot = new DiscordBot("BotToken", "nope");
        bot.setJDA(jda);
        Assert.assertTrue(bot.isLoggedIn());
        Assert.assertFalse(bot.sendMessage("@everyone YO"));

        MockJDA.MockTextChannel channel = (MockJDA.MockTextChannel) jda.getTextChannels().get(0);
        Assert.assertNull(channel.getLastMessageAction());
    }

    private class MockJDA implements JDA {
        private List<TextChannel> channels;

        MockJDA (String channelName) {
            channels = Collections.singletonList(new MockTextChannel(channelName));
        }

        private class MockTextChannel implements TextChannel, MessageChannel {
            private String _channelName;
            private MockMessageAction lastMessageAction;

            public MockTextChannel(String channelName) {
                _channelName = channelName;
            }

            private class MockMessageAction implements MessageAction {
                private boolean _queued = false;

                @NotNull
                @Override
                public JDA getJDA() {
                    return null;
                }

                @NotNull
                @Override
                public MessageAction setCheck(@Nullable BooleanSupplier booleanSupplier) {
                    return null;
                }

                @NotNull
                @Override
                public MessageAction timeout(long l, @NotNull TimeUnit timeUnit) {
                    return null;
                }

                @NotNull
                @Override
                public MessageAction deadline(long l) {
                    return null;
                }

                @Override
                public void queue(@Nullable Consumer<? super Message> consumer, @Nullable Consumer<? super Throwable> consumer1) {
                    _queued = true;
                }

                @Override
                public Message complete(boolean b) throws RateLimitedException {
                    return null;
                }

                @NotNull
                @Override
                public CompletableFuture<Message> submit(boolean b) {
                    return null;
                }

                @NotNull
                @Override
                public MessageChannel getChannel() {
                    return null;
                }

                @Override
                public boolean isEmpty() {
                    return false;
                }

                @Override
                public boolean isEdit() {
                    return false;
                }

                @NotNull
                @Override
                public MessageAction apply(@Nullable Message message) {
                    return null;
                }

                @NotNull
                @Override
                public MessageAction referenceById(long l) {
                    return null;
                }

                @NotNull
                @Override
                public MessageAction mentionRepliedUser(boolean b) {
                    return null;
                }

                @NotNull
                @Override
                public MessageAction failOnInvalidReply(boolean b) {
                    return null;
                }

                @NotNull
                @Override
                public MessageAction tts(boolean b) {
                    return null;
                }

                @NotNull
                @Override
                public MessageAction reset() {
                    return null;
                }

                @NotNull
                @Override
                public MessageAction nonce(@Nullable String s) {
                    return null;
                }

                @NotNull
                @Override
                public MessageAction content(@Nullable String s) {
                    return null;
                }

                @NotNull
                @Override
                public MessageAction embed(@Nullable MessageEmbed messageEmbed) {
                    return null;
                }

                @NotNull
                @Override
                public MessageAction append(@Nullable CharSequence charSequence, int i, int i1) {
                    return null;
                }

                @NotNull
                @Override
                public MessageAction append(char c) {
                    return null;
                }

                @NotNull
                @Override
                public MessageAction addFile(@NotNull InputStream inputStream, @NotNull String s, @NotNull AttachmentOption... attachmentOptions) {
                    return null;
                }

                @NotNull
                @Override
                public MessageAction addFile(@NotNull File file, @NotNull String s, @NotNull AttachmentOption... attachmentOptions) {
                    return null;
                }

                @NotNull
                @Override
                public MessageAction clearFiles() {
                    return null;
                }

                @NotNull
                @Override
                public MessageAction clearFiles(@NotNull BiConsumer<String, InputStream> biConsumer) {
                    return null;
                }

                @NotNull
                @Override
                public MessageAction clearFiles(@NotNull Consumer<InputStream> consumer) {
                    return null;
                }

                @NotNull
                @Override
                public MessageAction override(boolean b) {
                    return null;
                }

                @NotNull
                @Override
                public MessageAction allowedMentions(@Nullable Collection<Message.MentionType> collection) {
                    return null;
                }

                @NotNull
                @Override
                public MessageAction mention(@NotNull IMentionable... iMentionables) {
                    return null;
                }

                @NotNull
                @Override
                public MessageAction mentionUsers(@NotNull String... strings) {
                    return null;
                }

                @NotNull
                @Override
                public MessageAction mentionRoles(@NotNull String... strings) {
                    return null;
                }

                public boolean isQueued() {
                    return _queued;
                }
            }

            public MessageAction sendMessage(CharSequence _message) {
                lastMessageAction = new MockMessageAction();
                return lastMessageAction;
            }

            public MockMessageAction getLastMessageAction() {
                return lastMessageAction;
            }

            @Nullable
            @Override
            public String getTopic() {
                return null;
            }

            @Override
            public boolean isNSFW() {
                return false;
            }

            @Override
            public boolean isNews() {
                return false;
            }

            @Override
            public int getSlowmode() {
                return 0;
            }

            @NotNull
            @Override
            public ChannelType getType() {
                return null;
            }

            @Override
            public long getLatestMessageIdLong() {
                return 0;
            }

            @Override
            public boolean hasLatestMessage() {
                return false;
            }

            @NotNull
            @Override
            public String getName() {
                return _channelName;
            }

            @NotNull
            @Override
            public Guild getGuild() {
                return null;
            }

            @Nullable
            @Override
            public Category getParent() {
                return null;
            }

            @NotNull
            @Override
            public List<Member> getMembers() {
                return null;
            }

            @Override
            public int getPosition() {
                return 0;
            }

            @Override
            public int getPositionRaw() {
                return 0;
            }

            @NotNull
            @Override
            public JDA getJDA() {
                return null;
            }

            @Nullable
            @Override
            public PermissionOverride getPermissionOverride(@NotNull IPermissionHolder iPermissionHolder) {
                return null;
            }

            @NotNull
            @Override
            public List<PermissionOverride> getPermissionOverrides() {
                return null;
            }

            @NotNull
            @Override
            public List<PermissionOverride> getMemberPermissionOverrides() {
                return null;
            }

            @NotNull
            @Override
            public List<PermissionOverride> getRolePermissionOverrides() {
                return null;
            }

            @Override
            public boolean isSynced() {
                return false;
            }

            @NotNull
            @Override
            public ChannelAction<TextChannel> createCopy(@NotNull Guild guild) {
                return null;
            }

            @NotNull
            @Override
            public ChannelAction<TextChannel> createCopy() {
                return null;
            }

            @NotNull
            @Override
            public ChannelManager getManager() {
                return null;
            }

            @NotNull
            @Override
            public AuditableRestAction<Void> delete() {
                return null;
            }

            @NotNull
            @Override
            public PermissionOverrideAction createPermissionOverride(@NotNull IPermissionHolder iPermissionHolder) {
                return null;
            }

            @NotNull
            @Override
            public PermissionOverrideAction putPermissionOverride(@NotNull IPermissionHolder iPermissionHolder) {
                return null;
            }

            @NotNull
            @Override
            public InviteAction createInvite() {
                return null;
            }

            @NotNull
            @Override
            public RestAction<List<Invite>> retrieveInvites() {
                return null;
            }

            @NotNull
            @Override
            public RestAction<List<Webhook>> retrieveWebhooks() {
                return null;
            }

            @NotNull
            @Override
            public WebhookAction createWebhook(@NotNull String s) {
                return null;
            }

            @NotNull
            @Override
            public RestAction<Webhook.WebhookReference> follow(@NotNull String s) {
                return null;
            }

            @NotNull
            @Override
            public RestAction<Void> deleteMessages(@NotNull Collection<Message> collection) {
                return null;
            }

            @NotNull
            @Override
            public RestAction<Void> deleteMessagesByIds(@NotNull Collection<String> collection) {
                return null;
            }

            @NotNull
            @Override
            public AuditableRestAction<Void> deleteWebhookById(@NotNull String s) {
                return null;
            }

            @NotNull
            @Override
            public RestAction<Void> clearReactionsById(@NotNull String s) {
                return null;
            }

            @NotNull
            @Override
            public RestAction<Void> clearReactionsById(@NotNull String s, @NotNull String s1) {
                return null;
            }

            @NotNull
            @Override
            public RestAction<Void> clearReactionsById(@NotNull String s, @NotNull Emote emote) {
                return null;
            }

            @NotNull
            @Override
            public RestAction<Void> removeReactionById(@NotNull String s, @NotNull String s1, @NotNull User user) {
                return null;
            }

            @Override
            public boolean canTalk() {
                return false;
            }

            @Override
            public boolean canTalk(@NotNull Member member) {
                return false;
            }

            @Override
            public int compareTo(@NotNull GuildChannel o) {
                return 0;
            }

            @NotNull
            @Override
            public String getAsMention() {
                return null;
            }

            @Override
            public long getIdLong() {
                return 0;
            }
        }

        public List<TextChannel> getTextChannels() {
            return channels;
        }

        @NotNull
        @Override
        public Status getStatus() {
            return null;
        }

        @NotNull
        @Override
        public EnumSet<GatewayIntent> getGatewayIntents() {
            return null;
        }

        @Override
        public boolean unloadUser(long l) {
            return false;
        }

        @Override
        public long getGatewayPing() {
            return 0;
        }

        @NotNull
        @Override
        public JDA awaitStatus(@NotNull JDA.Status status, @NotNull Status... statuses) throws InterruptedException {
            return null;
        }

        @Override
        public int cancelRequests() {
            return 0;
        }

        @NotNull
        @Override
        public ScheduledExecutorService getRateLimitPool() {
            return null;
        }

        @NotNull
        @Override
        public ScheduledExecutorService getGatewayPool() {
            return null;
        }

        @NotNull
        @Override
        public ExecutorService getCallbackPool() {
            return null;
        }

        @NotNull
        @Override
        public OkHttpClient getHttpClient() {
            return null;
        }

        @NotNull
        @Override
        public DirectAudioController getDirectAudioController() {
            return null;
        }

        @Override
        public void setEventManager(@Nullable IEventManager iEventManager) {

        }

        @Override
        public void addEventListener(@NotNull Object... objects) {

        }

        @Override
        public void removeEventListener(@NotNull Object... objects) {

        }

        @NotNull
        @Override
        public List<Object> getRegisteredListeners() {
            return null;
        }

        @NotNull
        @Override
        public GuildAction createGuild(@NotNull String s) {
            return null;
        }

        @NotNull
        @Override
        public CacheView<AudioManager> getAudioManagerCache() {
            return null;
        }

        @NotNull
        @Override
        public SnowflakeCacheView<User> getUserCache() {
            return null;
        }

        @NotNull
        @Override
        public List<Guild> getMutualGuilds(@NotNull User... users) {
            return null;
        }

        @NotNull
        @Override
        public List<Guild> getMutualGuilds(@NotNull Collection<User> collection) {
            return null;
        }

        @NotNull
        @Override
        public RestAction<User> retrieveUserById(long l, boolean b) {
            return null;
        }

        @NotNull
        @Override
        public SnowflakeCacheView<Guild> getGuildCache() {
            return null;
        }

        @NotNull
        @Override
        public Set<String> getUnavailableGuilds() {
            return null;
        }

        @Override
        public boolean isUnavailable(long l) {
            return false;
        }

        @NotNull
        @Override
        public SnowflakeCacheView<Role> getRoleCache() {
            return null;
        }

        @NotNull
        @Override
        public SnowflakeCacheView<Category> getCategoryCache() {
            return null;
        }

        @NotNull
        @Override
        public SnowflakeCacheView<StoreChannel> getStoreChannelCache() {
            return null;
        }

        @NotNull
        @Override
        public SnowflakeCacheView<TextChannel> getTextChannelCache() {
            return null;
        }

        @NotNull
        @Override
        public SnowflakeCacheView<VoiceChannel> getVoiceChannelCache() {
            return null;
        }

        @NotNull
        @Override
        public SnowflakeCacheView<PrivateChannel> getPrivateChannelCache() {
            return null;
        }

        @NotNull
        @Override
        public RestAction<PrivateChannel> openPrivateChannelById(long l) {
            return null;
        }

        @NotNull
        @Override
        public SnowflakeCacheView<Emote> getEmoteCache() {
            return null;
        }

        @NotNull
        @Override
        public IEventManager getEventManager() {
            return null;
        }

        @NotNull
        @Override
        public SelfUser getSelfUser() {
            return null;
        }

        @NotNull
        @Override
        public Presence getPresence() {
            return null;
        }

        @NotNull
        @Override
        public ShardInfo getShardInfo() {
            return null;
        }

        @NotNull
        @Override
        public String getToken() {
            return null;
        }

        @Override
        public long getResponseTotal() {
            return 0;
        }

        @Override
        public int getMaxReconnectDelay() {
            return 0;
        }

        @Override
        public void setAutoReconnect(boolean b) {

        }

        @Override
        public void setRequestTimeoutRetry(boolean b) {

        }

        @Override
        public boolean isAutoReconnect() {
            return false;
        }

        @Override
        public boolean isBulkDeleteSplittingEnabled() {
            return false;
        }

        @Override
        public void shutdown() {

        }

        @Override
        public void shutdownNow() {

        }

        @NotNull
        @Override
        public AccountType getAccountType() {
            return null;
        }

        @NotNull
        @Override
        public RestAction<ApplicationInfo> retrieveApplicationInfo() {
            return null;
        }

        @NotNull
        @Override
        public String getInviteUrl(@Nullable Permission... permissions) {
            return null;
        }

        @NotNull
        @Override
        public String getInviteUrl(@Nullable Collection<Permission> collection) {
            return null;
        }

        @Nullable
        @Override
        public ShardManager getShardManager() {
            return null;
        }

        @NotNull
        @Override
        public RestAction<Webhook> retrieveWebhookById(@NotNull String s) {
            return null;
        }
    }
}