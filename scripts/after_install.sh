source /home/ec2-user/.bash_profile
source /home/ec2-user/.bashrc

cd /home/ec2-user/legacy-api
perl -pi -e 's/NODE_ENV=DEVELOPMENT/NODE_ENV=production/' config/.env.sample.js
perl -pi -e 's/NODE_ENV=test/NODE_ENV=production/' config/.env.sample.js
yarn
yarn buildEnv
yarn setup:rest-server
yarn setup:socket-server
yarn setup:services/coderunner-service
