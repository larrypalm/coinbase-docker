FROM node:17

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 4000

VOLUME [ "/app/node_modules" ]

CMD ["npm", "run", "start"]