FROM php:8.2-fpm-alpine

RUN apk update && apk add --no-cache \
    libpng-dev \
    libjpeg-turbo-dev \
    freetype-dev \
    sqlite-dev \
    zip \
    git \
    bash \
    curl \
    build-base

RUN docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install gd pdo pdo_sqlite bcmath

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

WORKDIR /var/www

COPY ./backend /var/www

RUN composer install

EXPOSE 8000

CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]
