FROM node:14
WORKDIR /usr/src/app

RUN ["apk", "add", "--update-cache", "python3" ]

COPY . ./

RUN ["yarn", "install"]
RUN ["yarn", "build"]

ENV NODE_ENV production

EXPOSE ${PORT}

CMD ["yarn", "start_with_logging"]