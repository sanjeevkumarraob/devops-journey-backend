FROM node:20-alpine
ENV NODE_ENV=production
WORKDIR /app
COPY [ "package.json", "package-lock.json*", "./"]
RUN apk --no-cache --virtual build-dependencies add \
    python3 \
    make \
    g++ \
    && npm install --production \
    && apk del build-dependencies
COPY . .
EXPOSE 4000
CMD ["npm", "run", "app"]
