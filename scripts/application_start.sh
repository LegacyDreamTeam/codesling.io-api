source /home/ec2-user/.bash_profile

cd /home/ec2-user/
pm2 start --name "RestServer" npm -- run start:rest-server --
pm2 start --name "SocketServer" npm -- run start:socket-server --
pm2 start --name "CodeServer" npm -- run start:services/coderunner-service --
