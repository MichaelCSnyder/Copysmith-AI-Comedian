#------------------Stage 1---------------------
FROM node:16.13 as development

WORKDIR /usr/src/app

# important to copy and install dependencies first to prevent installation of dependencies after every change to the src folder while in development mode
COPY package*.json .

RUN npm install

COPY . .

RUN npm run build


#------------------Stage 2---------------------
# necessary to remove TS bloat that doesn't need to make it to production image

FROM node:16.13 as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json .

RUN npm install --only=production

COPY --from=development /usr/src/app/build ./build

CMD ["node", "build/server/server.js"]