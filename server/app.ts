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

import * as express from "express";
import * as bodyParser from "body-parser";
import * as logger from "morgan";
import errorHandler = require("errorhandler");                // only for development
import methodOverride = require("method-override");

import { ApiController } from './controllers/ApiController';  // si importano le routes dello specifico file

const port: number = process.env.PORT || 5000;                // The port the express app will listen on
const argv = require('yargs').argv                            // recupera gli argomenti passati

class Server {

    public app: express.Application;

    constructor() {
        this.app = express();              // si crea l'istanza di express application
        this.registerMiddleware();
        this.registerRoutes();
        this.appListen();

        // si logga la variabile passata con --ciccio nello script del pachage.json
        console.log( `passata la variabile --ciccio ${argv.ciccio}` );
    }

    public static start(): Server {
        return new Server();
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
        this.app.use(logger("dev"));                                // use logger middlware
        this.app.use(bodyParser.json());                            // use json form parser middlware
        this.app.use(bodyParser.urlencoded({                        // use query string parser middlware
            extended: true
        }));
        this.app.use(methodOverride());
        //catch 404 and forward to error handler
        this.app.use(function (err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
            err.status = 404;
            next(err);
        });
        //error handling
        if (process.env.NODE_ENV === 'development') {
            // only use in development
            this.app.use(errorHandler());
        }
    }

    private appListen(): void {
        this.app.listen(port, (err) => {
            if (err) {
                console.log(err)
            }
            console.log(`Server is listening on ${port}`)
        })
    }
}

Server.start();