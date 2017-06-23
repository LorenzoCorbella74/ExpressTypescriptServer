/* 
    // Esempio di server minimo in Typescript con Node.js 
    import http = require('http');
    http.createServer((request, response) => {
        response.write('Hello from Node.js!');
        response.end();
    }).listen(3000);

    // Esempio di server minimo in Typescript e Express.js
    import * as express from "express";
    let app = express();

    app.get("/test", (req, res) => {
    res.send("test ok!");
    });

    app.listen(3000, () => {
    console.log("Porta 3000 in ascolto.");
    });
*/

/* 
    Esempio di server in Typescript con Node.js/Express.js 
    SOURCE: http://www.cross-platform-blog.com/nodejs/typescript/nodejs-a-rest-web-api-expressjs-with-typescript/    
*/

import * as express from "express";
import * as bodyParser from "body-parser";
import * as logger from "morgan";

import { ApiController } from './controllers/ApiController';  // si importano le rotte

const port: number = process.env.PORT || 5000;                // The port the express app will listen on

class Server {

    public app: express.Application;

    constructor() {
        this.app = express();              // istanza di  express application
        this.registerMiddleware();
        this.registerRoutes();
        this.appListen();
    }

    private registerRoutes(): void {
        // route generica per le istruzioni
        this.app.get('/', function (request, response) {
            response.send('index.html');
        });
        // Mount the WelcomeController at the /welcome route
        this.app.use('/api/test', ApiController);
    }

    private registerMiddleware(): void {
        this.app.use('/', express.static(__dirname + '/public'));   // file statici
        this.app.use(logger("dev"));                                //use logger middlware
        this.app.use(bodyParser.json());                            //use json form parser middlware
        this.app.use(bodyParser.urlencoded({                        //use query string parser middlware
            extended: true
        }));
    }

    private appListen() {
        this.app.listen(port, (err) => {
            if (err) {
                console.log(err)
            }
            console.log(`Server is listening on ${port}`)
        })
    }
}

new Server();