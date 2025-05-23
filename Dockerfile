# Install dependencies
FROM node:20-alpine AS dependencies
WORKDIR /app
COPY package*.json ./
# COPY yarn.lock ./
# RUN corepack enable && corepack prepare yarn@stable --activate
RUN corepack disable
RUN npm ci #--prefer-offline --no-audit
# RUN yarn install --frozen-lockfile
# RUN yarn install --immutable

# Build the project
FROM dependencies AS builder
COPY . .
RUN npm run build
# RUN yarn build

#
#
#

# Start with node
#FROM node:20-alpine AS run
#WORKDIR /app
#COPY --from=builder /app/public ./public
#COPY --from=builder /app/.next ./.next
#COPY --from=builder /app/node_modules ./node_modules
#COPY --from=builder /app/package.json ./package.json
#EXPOSE 3000
#CMD ["npm", "start"]

# Start with nginx
FROM nginx:stable-alpine AS run
WORKDIR /app
COPY --from=builder /app/out /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
WORKDIR /usr/share/nginx/html
EXPOSE 80
EXPOSE 443
CMD ["nginx", "-g", "daemon off;"]