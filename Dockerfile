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
# COPY nginx ./nginx
COPY --from=build /app/build /usr/share/nginx/html
COPY /data /build/data
COPY /assets /build/assets
# RUN rm /etc/nginx/conf.d/default.conf
COPY /nginx/nginx.conf /etc/nginx/conf.d/

ENV PORT 8080
EXPOSE $PORT
CMD ["nginx", "-g", "daemon off;"]
