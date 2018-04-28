source /home/ec2-user/.bash_profile

cd /home/ec2-user/legacy-api
yarn
yarn buildEnv
yarn setup:rest-server
yarn setup:socket-server
yarn setup:services/coderunner-service
