FROM ubuntu:20.04 AS build

ARG APP_RUBY_VERSION=2.7.6
ARG APP_NODE_VERSION=12
ARG RAILS_ENV=development
ARG SECRET_KEY_BASE=

SHELL ["/bin/bash", "-c"]
RUN echo 'debconf debconf/frontend select Noninteractive' | debconf-set-selections

# Relevant packages
RUN apt update
RUN apt upgrade -y
RUN apt install -y git curl build-essential unzip zip libssl-dev zlib1g-dev wget libmysqlclient-dev libsqlite3-dev yarn dirmngr apt-transport-https lsb-release ca-certificates cron

# Install rbenv & application ruby version
RUN git clone https://github.com/rbenv/rbenv.git ~/.rbenv
ENV PATH="/root/.rbenv/bin:/root/.rbenv/shims:$PATH"
RUN mkdir -p "$(rbenv root)"/plugins
RUN git clone https://github.com/rbenv/ruby-build.git "$(rbenv root)"/plugins/ruby-build
RUN rbenv install $APP_RUBY_VERSION
RUN rbenv global $APP_RUBY_VERSION

# Install node via nvm & yarn
RUN curl -sL https://deb.nodesource.com/setup_12.x | /bin/bash
RUN apt -y install nodejs

RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN apt update
RUN apt install --no-install-recommends -y yarn

COPY . /root/rails_app
WORKDIR /root/rails_app
RUN gem install bundler
RUN bundle install
RUN bundle exec rake db:migrate
RUN yarn install
RUN bundle exec rake webpacker:compile
RUN bundle exec whenever --update-crontab

EXPOSE 80
CMD ["bundle", "exec", "rails", "server", "-b", "0.0.0.0", "-p", "80"]