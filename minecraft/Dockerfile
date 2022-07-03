FROM eclipse-temurin:17

ARG MINECRAFT_STARTUP_COMMAND=$MINECRAFT_STARTUP_COMMAND
ENV MINECRAFT_STARTUP_COMMAND=$MINECRAFT_STARTUP_COMMAND

SHELL ["/bin/bash", "-c"]
RUN echo 'debconf debconf/frontend select Noninteractive' | debconf-set-selections

RUN apt update
RUN apt install -y wget git libreadline-dev unzip zip libssl-dev zlib1g-dev bzip2 build-essential ruby

RUN mkdir /root/bin
COPY server_status.rb /root/bin
ENV PATH="/root/bin:$PATH"

# Build spigot
RUN mkdir /tmp/build_spigot
WORKDIR /tmp/build_spigot
RUN wget -O BuildTools.jar https://hub.spigotmc.org/jenkins/job/BuildTools/lastSuccessfulBuild/artifact/target/BuildTools.jar
RUN java -jar BuildTools.jar
RUN mv spigot**.jar minecraft_server.jar

# Copy server files and install spigot
RUN mkdir /root/minecraft
RUN mkdir /root/minecraft/minecraft_server

COPY ./.devserver/* /root/minecraft/minecraft_server
RUN mv minecraft_server.jar /root/minecraft/minecraft_server

CMD ["ruby", "/root/bin/server_status.rb"]
