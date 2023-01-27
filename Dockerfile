FROM node:lts-alpine
WORKDIR /app
COPY package*.json ./

RUN npm install -g npm@9.3.1

COPY client/package*.json client/
RUN npm run install-client --omit=dev

COPY server/package*.json server/
RUN npm run install-server --omit=dev

COPY server/ server/

COPY client/ client/
RUN npm run build --prefix client

USER node
CMD ["npm", "start", "--prefix", "server"]
EXPOSE 8000