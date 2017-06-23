// Import only what we need from express
import { Router, Request, Response } from 'express';
import * as multer from "multer";

let upload = multer();  // For POST-Support

// Assign router to the express.Router() instance
const router: Router = Router();

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

// Export the express.Router() instance to be used by server.ts
export const ApiController: Router = router;
