FROM node:14
WORKDIR /usr/src/app

RUN ["apt-get", "update"]
RUN ["apt-get", "install", "-y",  "python3", "python3-pip"]
RUN ["pip3", "install", "numpy"]

COPY . ./

RUN ["yarn", "install"]
RUN ["yarn", "build"]

ENV NODE_ENV production

EXPOSE ${PORT}

CMD ["yarn", "start_with_logging"]