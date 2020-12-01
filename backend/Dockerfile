FROM node:14-alpine
WORKDIR /usr/src/app

RUN ["apt-get", "update"]
RUN ["apt-get", "install", "python", "-y"]

COPY . ./

RUN ["yarn", "install"]
RUN ["yarn", "build"]

ENV NODE_ENV production

EXPOSE ${PORT}

CMD ["yarn", "start_with_logging"]