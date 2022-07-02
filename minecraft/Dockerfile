FROM eclipse-temurin:17

SHELL ["/bin/bash", "-c"]
RUN echo 'debconf debconf/frontend select Noninteractive' | debconf-set-selections

RUN apt update
RUN apt install -y wget git

# Install ruby
RUN git clone https://github.com/rbenv/rbenv.git ~/.rbenv
ENV PATH="/root/.rbenv/bin:/root/.rbenv/shims:$PATH"
RUN mkdir -p "$(rbenv root)"/plugins
RUN git clone https://github.com/rbenv/ruby-build.git "$(rbenv root)"/plugins/ruby-build
RUN rbenv install $APP_RUBY_VERSION
RUN rbenv global $APP_RUBY_VERSION

# Build spigot
RUN mkdir /tmp/build_spigot
WORKDIR /tmp/build_spigot
RUN wget -O BuildTools.jar https://hub.spigotmc.org/jenkins/job/BuildTools/lastSuccessfulBuild/artifact/target/BuildTools.jar
RUN java -jar BuildTools.jar
RUN mv spigot**.jar minecraft_server.jar

# Copy server files and install spigot
RUN mkdir /root/minecraft
RUN mkdir /root/minecraft/minecraft_server
COPY .devcontainer/* /root/minecraft/minecraft_server
RUN mv minecraft_server.jar /root/minecraft/minecraft_server
COPY mc_status_service.rb /root/minecraft
WORKDIR /root/minecraft
