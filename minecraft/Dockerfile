FROM eclipse-temurin:17

ARG MINECRAFT_STATUS_PORT

SHELL ["/bin/bash", "-c"]
RUN echo 'debconf debconf/frontend select Noninteractive' | debconf-set-selections

RUN apt update
RUN apt install -y wget git libreadline-dev unzip zip libssl-dev zlib1g-dev bzip2 build-essential ruby screen

# Get Maven
WORKDIR /opt
RUN wget -O maven.tar.gz https://dlcdn.apache.org/maven/maven-3/3.8.6/binaries/apache-maven-3.8.6-bin.tar.gz
RUN tar -xzvf maven.tar.gz
ENV PATH="/opt/apache-maven-3.8.6/bin:$PATH"

# Build spigot plugin
RUN mkdir /tmp/spigot_plugin
COPY spigot_plugin /tmp/spigot_plugin
WORKDIR /tmp/spigot_plugin
RUN mvn package
RUN mv /tmp/spigot_plugin/target/AndresServerPlugin-jar-with-dependencies.jar /tmp/spigot_plugin/AndreServerPlugin.jar

# Build spigot
RUN mkdir /tmp/build_spigot
WORKDIR /tmp/build_spigot
RUN wget -O BuildTools.jar https://hub.spigotmc.org/jenkins/job/BuildTools/lastSuccessfulBuild/artifact/target/BuildTools.jar
RUN java -jar BuildTools.jar
RUN mv spigot**.jar minecraft-server.jar

# Build and install spigot_interface
RUN mkdir /tmp/spigot_interface
COPY spigot_interface /tmp/spigot_interface
WORKDIR /tmp/spigot_interface
RUN gem install bundler
RUN bundle install
RUN gem build
RUN gem install --local spigot_interface-*.gem

COPY startup.rb /root
WORKDIR /root/minecraft
CMD ruby /root/startup.rb
