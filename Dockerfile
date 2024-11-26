FROM node:18
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
EXPOSE 3333
CMD ["sh", "-c", "node ace migration:run && node ace serve --watch"]
