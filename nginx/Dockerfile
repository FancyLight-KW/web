FROM nginx

RUN mkdir /app
WORKDIR /app
RUN mkdir ./build
ADD ./build ./build
COPY ./default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80