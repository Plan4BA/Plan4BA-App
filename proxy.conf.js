const PROXY_CONFIG = {
  "/api": {
      "target": "https://plan4ba.ddkfm.de",
      "secure": false,
      "logLevel": "debug",
      "bypass": function (req, res, proxyOptions) {
        // if (req.url === '/api/meals') {
        //   return "meals-mock.json";
        // } else if (req.url === '/api/lectures') {
        //   return "lectures-mock.json";
        // } else if (req.url === '/api/login') {
        //   return "login-mock.json";
        // } else if (req.url === '/api/token') {
        //   return "token-mock.json";
        // }
        // if (req.url === '/api/university') {
        //   return "university-mock.json";
        // }
        if (req.url === '/api/notifications') {
          return "notifications-mock.json";
        } else if (req.method === 'DELETE' && req.url.indexOf('/api/notifications') === 0) {
          console.log('delete notification ' + req.url.split('/api/notifications/')[1]);
          return "notifications-delete-mock.json";
        }
      }
  }
} 

module.exports = PROXY_CONFIG;