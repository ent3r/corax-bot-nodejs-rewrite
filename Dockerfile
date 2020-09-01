# Indicate that we want to use node 14.7.0 alpine.
#? Alpine is simply a lighter image, although it is not as comprehensive as the normal image
FROM node:14.7-alpine

# I am the maintainer of this docker thing
LABEL maintainer="ent3r_"

# Copy the package.json and yarn.lock files to the /tmp directory, in order to install dependencies
# in a separate project
COPY package.json /tmp
COPY yarn.lock /tmp

# Change into the /tmp directory
WORKDIR /tmp

# Install all the dependencies
RUN yarn install --production=true

# Make the directory the bot will reside in and copy the node modules into it
RUN mkdir -p /opt/app && cp -a /tmp/node_modules /opt/app/

# Change to the directory and add the bot's files
WORKDIR /opt/app
ADD . .

RUN yarn run build

# Start the bot in production mode
CMD [ "yarn", "start" ]
