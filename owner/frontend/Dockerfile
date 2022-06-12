FROM node:18-alpine3.15
RUN npm install -g pnpm
WORKDIR /app
COPY . .
RUN pnpm install
CMD [ "pnpm", "dev" ]
EXPOSE 3001
