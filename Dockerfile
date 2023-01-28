FROM node:16-alpine3.16

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm install pm2 -g

COPY . .

EXPOSE 3300

CMD [ "pm2-runtime", "src/index.js" ]
