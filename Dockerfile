# Dockerfile

FROM node

WORKDIR /usr/src/main

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

CMD ["node", "dist/main.js"]
