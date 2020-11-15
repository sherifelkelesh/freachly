FROM node:14-alpine3.10

LABEL maintainer='Sherif Elkelesh'

RUN apk update

RUN mkdir -p /user/src/app

WORKDIR /user/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8000

CMD ["npm", "start"]