FROM node:14-alpine

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install

VOLUME [ "/data" ]
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
