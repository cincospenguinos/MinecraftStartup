# Minecraft Startup Server

All the tools I use to maintain my minecraft server.

## What does it entail?

* `rails_app` contains the Rails application that manages users, starts/stops the minecraft server, and does anything else that the web app needs to do
* `spigot_plugin` contains the plugin specifically for the web app. It's a little plugin that listens for connections and commands via localhost

## How do I deploy it?

I don't know! I haven't figured that out yet.

## Can I clone it and use it?

Sure! Feel free to modify it to your heart's content. If you have bugfixes, I'd really appreciate if you submit a PR, but otherwise it's available for free use.

## MVP

- [x] I can sign up on the server
- [x] I can start the server with my info
- [x] Andre can accept my sign up request, and I am informed via email
- [x] Andre can reject my sign up request, and I am informed via email
- [ ] I can see when the server is running