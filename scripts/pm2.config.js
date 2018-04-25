module.exports = {
  apps : [
    {
      name      : 'SocketServer',
      script    : 'npm',
      args: 'run start:socket-server',
      cwd: '/home/ec2-user/legacy-api'
    },
    {
      name      : 'RestServer',
      script    : 'npm',
      args: 'run start:rest-server',
      cwd: '/home/ec2-user/legacy-api'
    },
    {
      name      : 'CodeRunner',
      script    : 'npm',
      args: 'run start:services/coderunner-service',
      cwd: '/home/ec2-user/legacy-api'
    },
  ]
};
