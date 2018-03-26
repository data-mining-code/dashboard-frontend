FROM node:9-alpine
WORKDIR /usr/src/app

COPY package*.json ./

COPY . .

RUN npm install

EXPOSE 4040
CMD ["npm", "start"]
