const http = require('http');
const route = require('route-parser');

module.exports = (() => {
  let routes = [];

  const addRoute = (method, url, handler) => {
    routes.push({ method, url: new route(url), handler });
  };

  const get = (route, handler) => addRoute('get', route, handler);
  const post = (route, handler) => addRoute('post', route, handler);
  const put = (route, handler) => addRoute('put', route, handler);
  const destroy = (route, handler) => addRoute('destroy', route, handler);

  const findRoute = (method, url) => {
    const route = routes.find(route => {
      return route.method === method && route.url.match(url);
    });

    if (!route) return null;

    return { handler: route.handler, params: route.url.match(url) };
  };


  const router = () => {
    const listen = (port, callback) => {
      http.createServer((request, response) => {
          const method = request.method.toLowerCase();
          const url = request.url.toLowerCase();
          const route = findRoute(method, url);

          if (route) {
            request.params = route.params;

            response.send = content => {
              response.writeHead(200, { 'Content-Type': 'text/plain' });
              response.end(content);
            };

            return route.handler(request, response);
          }

          response.writeHead(404, { 'Content-Type': 'text/plain' });
          response.end('Route not found.');
        }).listen(port, callback);
    };

    return {
      get,
      post,
      put,
      destroy,
      listen
    };
  };

  return router;
})();
