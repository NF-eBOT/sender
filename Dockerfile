FROM node:slim

RUN apt-get update -y
RUN apt-get install build-essential -y
RUN apt-get install python -y
RUN apt-get install nano -y
RUN apt-get install git -y

ADD . /data
WORKDIR /data
RUN npm install