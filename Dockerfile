FROM node:10.22.1

USER nodeuser

WORKDIR /var/www/html

COPY package.json ./
RUN npm install --ignore-scripts

COPY src .
COPY env-example .env
COPY sequelizerc-example .sequelizerc

EXPOSE 3000
CMD ["npm", "start"]