FROM node

RUN mkdir -p /usr/src/app/
WORKDIR /usr/src/app/
COPY ./ ./usr/src/app/
RUN npm install

EXPOSE 3000

CMD ["node", "server.js"]

#Step_1:  docker build -t fales .
#Step_2:  docker run --rm --name web -p 3000:3000 files