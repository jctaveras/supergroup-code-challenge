FROM node:lts

WORKDIR /server
COPY package.json .

RUN yarn

COPY . .

RUN yarn build

CMD ["node", "dist/src/index.js"]
