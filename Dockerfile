FROM node:10.22.1

WORKDIR /var/www/html

COPY package.json ./
RUN npm install

COPY . .
COPY env-example .env
COPY sequelizerc-example .sequelizerc

EXPOSE 3000
CMD ["npm", "start"]