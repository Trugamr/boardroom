FROM node:18-alpine as base

#####

FROM base as development

WORKDIR /app

ADD package.json package-lock.json ./
ADD prisma ./prisma
RUN npm install

#####

FROM base as production

WORKDIR /app

COPY --from=development /app/node_modules ./node_modules
ADD package.json package-lock.json ./
RUN npm install --omit=dev
# Clean Prisma non-used files https://github.com/prisma/prisma/issues/11577
RUN rm -rf /app/node_modules/.cache/ \
    rm -rf /app/node_modules/@prisma/engines/ \
    rm -rf /app/node_modules/@prisma/engines-version \
    rm -rf /app/node_modules/prisma
# Pruning removes generated prisma client so we copy them back
COPY --from=development /app/node_modules/.prisma ./node_modules/.prisma

#####

FROM base as build

ENV NODE_ENV production

WORKDIR /app

COPY --from=development /app/node_modules ./node_modules
ADD . .
RUN npm run build

######

FROM base as deploy

ENV NODE_ENV production
EXPOSE 3000

WORKDIR /app

COPY --from=production /app/node_modules ./node_modules
COPY --from=build /app/build /app/build
COPY --from=build /app/public /app/public
ADD . .

CMD ["npm", "start"]