FROM nginx

RUN mkdir /app
WORKDIR /app
RUN mkdir ./www
COPY ./build/* ./www/
COPY ./default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80