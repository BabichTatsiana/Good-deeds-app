FROM node:alpine As build
WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .
RUN npm run build

FROM node:alpine as final
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
COPY package*.json .
RUN npm install --omit=dev
COPY --from=build /app/dist ./dist
EXPOSE 5000
CMD ["node", "dist/main"]
