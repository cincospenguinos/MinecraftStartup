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

## TODO, as part of getting docker put together

- [x] Create a volume and have _it_ store all of the minecraft server data. For development that can be .devserver
- [x] Adjust the notify command to return OK or ERROR in Spigot
- [ ] Fix spigot_plugin to respect receiving nil or empty string from client
- [ ] Have spigot_plugin catch, print, and retry always
- [ ] Figure out how to put together a mysql DB volume for prod. I think that's what's on the host right now...
- [ ] Put together environment variables for deploying to prod
- [ ] Figure out method of deploying to prod

## TODO, as something nice to do later
- [ ] Figure out a way to pull the spigot plugin ruby gem from github. [This guy's article may help getting it together with workflows](https://michaelheap.com/rubygem-github-package-registry/)
- [ ] Figure out a way to publish your docker containers up to github. Maybe consolidate the two down to just a single container with everything installed to save space
- [ ] Figure out how bundle --vendor works to make the build step a lot faster
- [ ] Have the minecraft server stay in pending state until the server comes up, or emits an error state if the server never comes up