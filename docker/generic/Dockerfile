# docker build -t generic-vuejs .

# docker run --name test-vuejs -p 8082:80 -e REPOSITORY='https://github.com/dkvz/music-planning-frontend.git' generic-vuejs

FROM node:lts-alpine

ENV REPOSITORY 'https://github.com'
ENV COMMIT 'master'

RUN apk add --no-cache git
RUN apk add --no-cache nginx
COPY nginx_server.conf /etc/nginx/conf.d/default.conf

WORKDIR /usr/src
COPY init.sh ./

EXPOSE 80
CMD ["sh", "init.sh"]