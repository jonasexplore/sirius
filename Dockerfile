FROM node:19.8-slim

USER node

WORKDIR /home/node/app

CMD ["sh", "-c", "npm install && npm run start"]