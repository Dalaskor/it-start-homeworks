const METHODS = {
    get: 'GET',
    post: 'POST',
    put: 'PUT',
    delete: 'DELETE',
}

module.exports = class Router {
    constructor() {
        this.endpoints = {};
    }

    request(method = METHODS.get, path, handler) {
        if(!this.endpoints[path]) {
            this.endpoints[path] = {}
        }

        const endpoint = this.endpoints[path];

        if(endpoint[method]) {
            throw new Error(`[${method}] with path '${path}' already exists`);
        }

        endpoint[method] = handler;
    }

    get(path, handler) {
        this.request(METHODS.get, path, handler);
    }

    post(path, handler) {
        this.request(METHODS.post, path, handler);
    }

    put(path, handler) {
        this.request(METHODS.put, path, handler);
    }

    delete(path, handler) {
        this.request(METHODS.delete, path, handler);
    }
}
