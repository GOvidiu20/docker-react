FROM node:16-alpine as builder

WORKDIR '/app/'

COPY package.json .

RUN npm install

COPY . .

RUN npm run build

FROM nginx
# Remove the default Nginx configuration
RUN rm /etc/nginx/conf.d/default.conf

# Copy your custom Nginx configuration to the container
COPY nginx.conf /etc/nginx/conf.d/

# Copy your application code to the container (adjust the path accordingly)
COPY --from=builder /app/build /usr/share/nginx/html

# Expose the port that Nginx will listen on
EXPOSE 80

# Start Nginx when the container starts
CMD ["nginx", "-g", "daemon off;"]
