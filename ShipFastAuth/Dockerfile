FROM ruby:2.3.0
RUN apt-get update -qq && apt-get install -y build-essential libpq-dev nodejs
RUN mkdir /auth
WORKDIR /auth
COPY Gemfile /auth/Gemfile
COPY Gemfile.lock /auth/Gemfile.lock
RUN bundle install
CMD ["rails", "server"]