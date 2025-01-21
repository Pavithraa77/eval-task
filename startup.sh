#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

# Update package list and install updates
sudo apt-get update -y && sudo apt-get upgrade -y

# Install Node.js and npm
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install Git
sudo apt-get install -y git

# Clone the application repository
APP_DIR="/var/www/eval"
if [ ! -d "$APP_DIR" ]; then
    sudo git clone https://github.com/Pavithraa77/eval-task.git $APP_DIR
else
    cd $APP_DIR
    sudo git pull origin main
fi

# Navigate to the application directory
cd $APP_DIR/backend

# Install Node.js dependencies
npm install

# Start the Node.js application
npm start

# Optional: Configure a process manager like PM2 to keep the app running
sudo npm install -g pm2
pm2 start server.js --name eval
pm2 startup
pm2 save
