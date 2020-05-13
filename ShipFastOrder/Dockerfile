FROM ruby:2.3.0
RUN apt-get update -qq && apt-get install -y build-essential libpq-dev nodejs
RUN mkdir /order
WORKDIR /order
COPY Gemfile /order/Gemfile
COPY Gemfile.lock /order/Gemfile.lock
RUN bundle install
CMD ["rails", "server"]