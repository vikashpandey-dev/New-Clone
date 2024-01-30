# build stage
FROM node:14-alpine as build-stage

ARG DEST

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# production stage

FROM nginx:stable-alpine as production-stage
#COPY ./dist /usr/share/nginx/html
COPY --from=0 /app/build /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf

COPY nginx/nginx.conf /etc/nginx/conf.d

#RUN mkdir -p /etc/nginx/ssl

#RUN mkdir -p /etc/nginx/snippets

#COPY nginx/ssl /etc/nginx/ssl
#COPY nginx/snippets /etc/nginx/snippets

EXPOSE 80
#EXPOSE 443
CMD ["nginx", "-g", "daemon off;"]
