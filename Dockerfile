FROM node:12

WORKDIR /usr/src/app

# установка зависимостей
# символ астериск ("*") используется для того чтобы по возможности
# скопировать оба файла: package.json и package-lock.json
COPY package*.json ./
RUN npm install
# Если вы создаете сборку для продакшн
# RUN npm ci --only=production
# копируем исходный код
COPY . .
EXPOSE 3000

CMD ["node", "server.js"]

#Step_1:  docker build -t files .
#Step_2:  docker run --rm --name web -p 3000:3000 files
#Step_2:  docker run --rm --name web -p 3000:3000 -v /root/sprite_script_web/node_modules:/proj/node_modules files
