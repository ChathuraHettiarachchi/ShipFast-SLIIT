FROM ruby:2.3.0
RUN apt-get update -qq && apt-get install -y build-essential libpq-dev nodejs
RUN mkdir /delivery
WORKDIR /delivery
COPY Gemfile /delivery/Gemfile
COPY Gemfile.lock /delivery/Gemfile.lock
RUN bundle install
CMD ["rails", "server"]