FROM node:22.12.0 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:1.27
COPY --from=build /app/dist/course-manager /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]