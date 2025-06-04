# frontend/Dockerfile
FROM node:18

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

# Build the Next.js app
RUN npm run build

EXPOSE 3001

CMD ["npm", "run", "start"]
