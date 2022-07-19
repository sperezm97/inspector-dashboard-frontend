#####################################
##           Dependencies          ##
#####################################
# Install dependencies only when needed
FROM alpine:3.14 AS deps

# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat python2 g++ make && \
    rm -rf /var/cache/apk/* && \
    apk add yarn

WORKDIR /app
# copy the package.json to install dependencies
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile  

#####################################
##               Build             ##
#####################################
FROM node:lts-alpine as builder

# get the node environment to use
ARG NODE_ENV
ENV NODE_ENV ${NODE_ENV:-production}

# some projects will fail without this variable set to true
ARG SKIP_PREFLIGHT_CHECK
ENV SKIP_PREFLIGHT_CHECK ${SKIP_PREFLIGHT_CHECK:-true}
ARG DISABLE_ESLINT_PLUGIN
ENV DISABLE_ESLINT_PLUGIN ${DISABLE_ESLINT_PLUGIN:-true}

WORKDIR /app
# build app for production with minification
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN yarn build

#####################################
##               Release           ##
#####################################
FROM nginx:stable-alpine as release

ENV PORT 8080
ENV HOST 0.0.0.0

# use a custom template for nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf.template

# bring the built files from the previous step
COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE ${PORT}

CMD sh -c "envsubst '\$PORT' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"
