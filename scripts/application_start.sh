source /home/ec2-user/.bash_profile

cd /home/ec2-user/legacy-api
pm2 restart --name "RestServer" npm -- run start:rest-server --
pm2 restart --name "SocketServer" npm -- run start:socket-server --
pm2 restart --name "CodeServer" npm -- run start:services/coderunner-service --
