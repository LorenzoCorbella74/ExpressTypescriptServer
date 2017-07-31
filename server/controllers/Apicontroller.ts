// Import only what we need from express
import { Router, Request, Response } from 'express';
import * as multer from "multer";

// declare axios for making http requests
import * as axios from 'axios';

const EXTERNALAPI = 'http://5847d6a3b0079b12008911ad.mockapi.io/api/v1';

let upload = multer();  // For POST-Support

// Assign router to the express.Router() instance
const router: Router = Router();

router.use(function(req, res, next) { 
    /* 
    Se ho il FE che è servito da un server sulla porta 8000 ed il nostro server 
    ha invece un altra porta si deve specificare (è soltanto una impostazione BE)
    la porta da aprire, gli eventuali verbi accettati e la key di autenticazione:
    */
    res.header('Access-Control-Allow-Origin', 'http://localhost:8000');
    // we have added this Access-Control-Allow-Headers option
    res.header('Access-Control-Allow-Headers', 'X-Auth-Key');

    next();
});

/*
I browser fanno una così detta "preflight" 'OPTIONS' request che restituisce i metodi supportati 
dal server con i verbi HTTP verb  ed una volta che l'approvazione arriva, la reale chiamata HTTP 
supera lo stato pending, e viene eseguita. E' sempre bene specificare quindi anche la 'options' request...
*/
router.options(function (req, res, next) {
        res.status(200).end();
        next();
});

/*autenticazione con */
router.get('/autentication', function (req, res) {
        // notice how the key is all lowercase!
        var clientKey = req.headers['x-auth-key'];
        var acceptedKey = 'abc123';
        if (clientKey !== acceptedKey) {
            res.status(401).end();
        } else {
            res.json({data: 'Hello World'});
        }
    });

// route con parametri
router.get('/:name', (request, response) => {
    let name = request.params.name;
    if (!isNaN(name)) {
        response
            .status(400)
            .send('No string as name');
    } else {
        response.json({
            "message": name
        });
    }
});

// con query string (ES: http://localhost:3000/api/test?name=NodeJS )
router.get('/', (request, response) => {
    let name = request.query.name;
    let result = { message: name };
    if (!isNaN(name)) {
        response
            .status(400)
            .send('No string as name');
    } else {
        response.json(result);
    }
});

// POST Request (da POSTMAN: Postman select “POST” first and type in the URL field http://localhost:3000/api/test/)
router.post('/', upload.array(), (request, response) => {
    let name = request.body.name;
    if (!isNaN(name)) {
        response
            .status(400)
            .send('No string as name');
    } else {
        console.log('Hello ' + name);
    }
    response.send('POST request to homepage');
});

// esempio di route che recupera dati da un webservice esterno
router.get('/external/users', (req, res) => {
    axios.get(`${EXTERNALAPI}/users`)
        .then(posts => {
            res.status(200).json(posts.data);
        })
        .catch(error => {
            console.error(error);
            res.status(500).send({
                status: 500,
                message: 'internal error',
                type: 'internal'
            });
        });
});

// Export the express.Router() instance to be used by server.ts
export const ApiController: Router = router;
