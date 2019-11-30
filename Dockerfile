FROM node:10.16.1-alpine as builder
ARG NODE_APP_INSTANCE=""
ENV NODE_APP_INSTANCE=${NODE_APP_INSTANCE}
ENV NODE_ENV="production"
WORKDIR /app/
RUN apk add git
COPY package.json ./
RUN NODE_ENV=development npm install
COPY . .
RUN npm run build

FROM builder as dev
CMD npm run start

FROM nginx:alpine
COPY --from=builder /app/www /usr/share/nginx/html
COPY nginx.conf /etc/nginx/
