FROM node:10.11.0-alpine
MAINTAINER kazuhito_m
WORKDIR /app
COPY ./src /app/src
COPY ./*.js* /app/
RUN apk add git \
  && npm install \
  && npm run build \
  && ls | grep -v dist | xargs rm -rf \
  && echo 'node dist/bundle.js -k ${DISCORD_APP_KEY}' > ./start.sh
ENTRYPOINT ["/bin/sh", "./start.sh"]