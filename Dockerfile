FROM node:16-alpine
WORKDIR /
RUN apk --no-cache add curl
COPY package*.json ./
RUN npm install --slient
COPY . .
CMD ["npm", "start"]
EXPOSE 3000
