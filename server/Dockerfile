# backend/Dockerfile
FROM node:18

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

# Generate Prisma client
RUN npx prisma generate

# Start the server
CMD ["npm", "run", "dev"]
