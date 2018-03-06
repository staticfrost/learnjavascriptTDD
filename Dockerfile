FROM node:carbon

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json and package-lock.json are copied
# where avalaible (npm@5+)
COPY package*.json ./


# By defeault this does --dev
RUN apt-get vim
RUN npm install
RUN npm  i --save-dev jest
# IF you are building your code for production
# RUN npm install --only=production

# Bundle app source
COPY . .

EXPOSE 8080

# Start command
CMD [ "npm", "start" ]
