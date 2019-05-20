function handleGet(req) {
  switch (req.url) {
    case '/api/meals':
      return 'meals-mock.json';
      break;

    case '/api/lectures':
      return 'lectures-mock.json';
      break;

    default:
      break;
  }
}

function handleDelete(req) {
  if (req.url.indexOf('/api/notifications') === 0) {
    return 'notifications-delete-mock.json';
  }
}

const PROXY_CONFIG = {
  '/api': {
    target: 'http://192.168.0.2:8080',
    secure: false,
    logLevel: 'debug',
    bypass: function(req, res, proxyOptions) {
      switch (req.method) {
        case 'GET':
          return handleGet(req);
          break;

        case 'DELETE':
          return handleDelete(req);
          break;

        default:
          break;
      }
    }
  }
};

module.exports = PROXY_CONFIG;
