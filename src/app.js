const cors = require('cors');
const express = require('express');

const routes = require('./routes');


class App {

    constructor() {
        this.express = express();

        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.express.use(cors());
        this.express.use(express.urlencoded({ extended: true }));
        this.express.use(express.json());
    }

    routes() {
        this.express.use(routes);
    }
}

module.exports = new App().express;
