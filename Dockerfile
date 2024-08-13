
# syntax=docker/dockerfile:1

ARG NODE_VERSION=18.18.2


FROM node:${NODE_VERSION}-alpine as base
WORKDIR /usr/src/app
COPY . .
RUN npm install && npm install @nestjs/cli
RUN npm install cross-env


FROM base AS development
EXPOSE 3000
EXPOSE 8081
CMD npm run start:dev


FROM base AS build
RUN npm run build

RUN npx prisma generate

FROM build AS production
CMD ["npm", "run",  "start:migrate:prod"];