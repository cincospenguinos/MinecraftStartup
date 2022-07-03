FROM eclipse-temurin:17

SHELL ["/bin/bash", "-c"]
RUN echo 'debconf debconf/frontend select Noninteractive' | debconf-set-selections

RUN apt update
RUN apt install -y wget git libreadline-dev unzip zip libssl-dev zlib1g-dev bzip2 build-essential ruby screen

RUN mkdir /root/bin
COPY server_status.rb /root/bin
ENV PATH="/root/bin:$PATH"

# Get Maven
WORKDIR /opt
RUN wget -O maven.tar.gz https://dlcdn.apache.org/maven/maven-3/3.8.6/binaries/apache-maven-3.8.6-bin.tar.gz
RUN tar -xzvf maven.tar.gz
ENV PATH="/opt/apache-maven-3.8.6/bin:$PATH"

# Build spigot plugin
RUN mkdir /tmp/spigot_plugin
COPY spigot_plugin/src /tmp/spigot_plugin
COPY spigot_plugin/pom.xml /tmp/spigot_plugin
WORKDIR /tmp/spigot_plugin
RUN mvn package

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
RUN mv /tmp/spigot_plugin/target/AndresServerPlugin-jar-with-dependencies.jar /root/minecraft/minecraft_server/plugins

CMD ["ruby", "/root/bin/server_status.rb"]
