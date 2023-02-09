FROM node:18-alpine

WORKDIR /api

COPY /api/package*.json ./

RUN npm install

COPY /api .

EXPOSE 3000

CMD [ "npm", "run", "start" ]
