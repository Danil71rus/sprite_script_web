FROM node

RUN mkdir -p ./proj
WORKDIR ./proj
COPY ./ ./proj/

EXPOSE 3000

CMD ["node", "server.js"]

#Step_1:  docker build -t fales .
#Step_2:  docker run --rm --name web -p 3000:3000 files
#Step_2:  docker run --rm --name web -p 3000:3000 -v /node_modules:/proj files
