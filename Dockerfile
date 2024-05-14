FROM node:21-alpine
WORKDIR /opt/app
COPY package.json package-lock.json ./
RUN npm install
RUN npm rebuild bcrypt
COPY . .
ENV NODE_ENV production
RUN npm run postinstall
RUN npm run build
RUN npm prune --production
CMD ["npm", "start"]
EXPOSE 3000