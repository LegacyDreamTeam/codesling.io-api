source /home/ec2-user/.bash_profile

cd /home/ec2-user/legacy-api
pm2 stop RestServer
pm2 stop SocketServer
pm2 stop CodeRunner
