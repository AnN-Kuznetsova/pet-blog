FROM node:16-alpine AS base
WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm ci
COPY . .

FROM base AS test
# RUN npm run test

FROM test AS build
RUN npm run build

FROM nginx:1.16.0-alpine AS server
COPY --from=build /app/build /usr/share/nginx/html
ENV PORT 80
EXPOSE $PORT
CMD ["nginx", "-g", "daemon off;"]
