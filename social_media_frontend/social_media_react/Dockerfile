FROM node:16.20.0-alpine
WORKDIR /social_media_frontend
COPY ./social_media_frontend/social_media_react/package.json .
RUN npm install

COPY ./social_media_frontend/social_media_react .

CMD [ "npm", "run", "start" ]