FROM node:17-alpine3.14 as build-node
WORKDIR /usr/src/app

COPY . .

CMD ["npm","run","start"]