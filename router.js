//noinspection JSLint,JSLint,JSLint
/**
 * Created by Miguel on 26/04/16.
 */

//Declaración de un módulo de Node.js para exportar el objeto Router, con una propiedad que almacena las rutas.
var Router = module.exports = function () {
    'use strict';
    this.routes = [];
};
Router.prototype.add = function (method, url, handler) {
    'use strict';
    this.routes.push({method : method, url: url, handler: handler});
};

Router.prototype.resolve = function (request, response) {
    'use strict';
    var path = require("url").parse(request.url).pathname;
    return this.routes.some(function (route) {
        var match = route.url.exec(path);
        if (!match || route.method !== request.method) {
            return false;
        }
        var urlParts = match.slice(1).map(decodeURIComponent);
        route.handler.apply(null, [request, response].concat(urlParts));
        return true;
    });
};
