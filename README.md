# Minecraft Startup Server

A fully configured minecraft server running latest spigot.

## How does it work?

There are two major components:

1. A rails application that handles users starting/stopping the server, found in `rails_app`
1. The minecraft server that handles start/stop requests and exposes extra information as needed, found in `minecraft`

## Developing

I strongly suggest getting all the little tools you need on whatever platform you're on to work on each of the components individually. Deployment is done with docker.

No matter what, always always **always** add tests for your changes.

## Deploying

TODO

## Can I clone it, use it, modify it, etc?

Absolutely! I am keeping this open source for my own benefit, but if you can figure out how to get everything working, feel free to adapt it to your own use case.
