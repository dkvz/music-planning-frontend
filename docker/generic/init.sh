#!/bin/sh
git clone "$REPOSITORY" app
cd app
git checkout "$COMMIT"
npm install
npm run build
mkdir -p /usr/share/nginx
mv dist /usr/share/nginx/html
mkdir -p /run/nginx
nginx -g 'daemon off;'