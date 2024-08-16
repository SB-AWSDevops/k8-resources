FROM nginx:1.24-alpine

# Remove the default configuration
RUN rm /etc/nginx/conf.d/default.conf

# Copy your custom configuration file
COPY default.conf /etc/nginx/conf.d/default.conf

# Copy static files
COPY index.html /usr/share/nginx/html/index.html

# Optionally copy nginx.conf if you need custom settings there
COPY nginx.conf /etc/nginx/nginx.conf
