FROM node:23-alpine3.19

WORKDIR /usr/src/app

COPY package.json .
COPY package-lock.json .

RUN npm ci

COPY . .

EXPOSE 80

CMD [ "npm", "run", "dev" ]
# OR CMD ["npm", "run", "prod"]
# 