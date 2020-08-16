FROM node:10.13.0-alpine

# Env
ENV ENV_NAME dev
ENV EGG_SERVER_ENV dev
ENV NODE_ENV dev
ENV NODE_CONFIG_ENV dev

# Create Directory for the Container
WORKDIR /usr/src/server
# Only copy the package.json file to work directory
COPY backend/package.json .

# Install all Packages
RUN npm install
# Copy all other source code to work directory
ADD backend/. /usr/src/server
# Start
CMD [ "npm", "start" ]
EXPOSE 7001