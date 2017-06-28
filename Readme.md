# Server con Node/Express & Typescript e Visual Studio CODE</h1>

## Istallazione
Per istallare le dipendenze: `npm install`

## Traspilazione & Server & Debug
Tramite [VS CODE](https://code.visualstudio.com/):
* Aprire il task runner della compilazione TS 2 JS con: `CTRL + SHIFT + B` o premere `F1`  +e scrivere `Build` ;
* far partire il server con il debug abilitato con:
    - `F5` partenza e step
    - `SHIFT + F5` per fermare
    - `CTRL + SHIFT + F5` per farlo ripartire
    - `F10` per next line
    - `F11` per step in
                    
Oppure da terminale:
* Avviare la transpilazione ed il server con: `npm run dev`
            
## REST API: esempi di endpoints

* `GET /` restituisce questa pagina di istruzioni
* `GET /api/test/:name` restituisce un json con il parametro passato
* `GET /api/test?name=NodeJS` restituisce un json con il query string passato 
* `POST /api/test` restituisce un msg con il name passato
* `GET /api/test/external/users` restituisce un json recuperando dati da un api esterna (request con [axios](https://github.com/mzabriskie/axios/)

Oppure mettere dei mock in formato `.json` dentro la cartella `mock/api/customers.json` e si avrà una mappatura con `// http://ipaddress:port/mockapi/customers` .

