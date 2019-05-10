FROM node:10

ARG NPM_CONFIG_ALWAYS_AUTH
ARG NPM_CONFIG_EMAIL
ARG NPM_CONFIG__AUTH
ARG NPM_CONFIG_REGISTRY
ARG NPM_TOKEN

RUN npm config set always-auth ${NPM_CONFIG_ALWAYS_AUTH} \
    && npm config set email ${NPM_CONFIG_EMAIL} \
    && npm config set _auth ${NPM_CONFIG__AUTH} \
    && npm config set registry ${NPM_CONFIG_REGISTRY}

RUN touch /tmp/.npmrc \
    && printf "@axa-asia:registry=https://npm-server.paas.axa-asia.com\n" >> /tmp/.npmrc \
    && printf "strict-ssl=false\n" >> /tmp/.npmrc \
    && printf "//npm-server.paas.axa-asia.com/:_authToken=\${NPM_TOKEN}" >> /tmp/.npmrc

# npm install
ADD package.json /tmp/package.json

RUN cd /tmp && npm install
RUN rm -f /tmp/.npmrc

RUN mkdir -p /opt/app-root && cp -a /tmp/node_modules /opt/app-root/

WORKDIR /opt/app-root/
COPY . .

RUN npm run build

EXPOSE 8080

CMD ["npm", "run", "start"]
