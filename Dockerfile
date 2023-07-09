FROM node:18.12.1

WORKDIR /book-manager

COPY package.json .
COPY package-lock.json .

RUN npm install
CMD [ "npm", "run", "start" ]