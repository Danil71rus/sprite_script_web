FROM node:12.18.3

#RUN mkdir -p /usr/src/app/

WORKDIR /usr/app/front
EXPOSE 3000
COPY ./ ./
RUN npm install

CMD ["node", "server.js"]

#Step_1:  docker build -t fales .
#Step_2:  docker run --rm --name web -p 3000:3000
