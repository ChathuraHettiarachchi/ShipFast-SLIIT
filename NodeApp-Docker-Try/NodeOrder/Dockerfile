FROM node:12-alpine3.10
RUN mkdir /order
WORKDIR /order
COPY package.json package.json
RUN npm install && mv node_modules /node_modules
COPY . .
LABEL maintainer="Chathura Hettiarachchi"
CMD node index.js