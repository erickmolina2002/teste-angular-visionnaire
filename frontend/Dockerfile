FROM node:18

WORKDIR /app

COPY ./frontend /app

RUN npm install

EXPOSE 4200

CMD ["npm", "start", "--", "--host", "0.0.0.0"]

