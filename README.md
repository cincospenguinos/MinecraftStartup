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

### Deploying to prod

- [x] Get a sql dump of the MySQL
- [x] Bring up SQLite and transfer MySQL over to SQLite
- [x] Install Docker and Docker Compose
- [ ] Get latest version of application and build it
- [ ] Put together environment file that overrites various environment variables according to our needs
- [ ] Run the application in detached mode to ensure the volumes get built
- [ ] Copy the mysql dump up into the rails container
- [ ] Use sqlite to dump sqlite DB into recently built db
- [ ] Configure nginx to do proxy_pass to the localhost's server
- [ ] Ensure everything works as intended

## TODO, as something nice to do later
- [ ] Fix spigot_plugin to respect receiving nil or empty string from client
- [ ] Figure out a way to pull the spigot plugin ruby gem from github. [This guy's article may help getting it together with workflows](https://michaelheap.com/rubygem-github-package-registry/)
- [ ] Figure out a way to publish your docker containers up to github. Maybe consolidate the two down to just a single container with everything installed to save space
- [ ] Figure out how bundle --vendor works to make the build step a lot faster
- [ ] Have the minecraft server stay in pending state until the server comes up, or emits an error state if the server never comes up