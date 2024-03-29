FROM node:latest

WORKDIR /usr/src/xflair

COPY . /usr/src/xflair

RUN npm install

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]



