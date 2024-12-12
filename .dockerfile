FROM node:20-slim

RUN groupadd -r nodeapp && useradd -r -g nodeapp nodeapp

WORKDIR /app

COPY package*.json ./

RUN npm ci --only=production

COPY . .

RUN chown -R nodeapp:nodeapp /app

USER nodeapp

EXPOSE 8080

CMD ["npm", "start"]