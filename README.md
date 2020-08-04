# Travel Log

A full stack application to store/list places you have traveled.

### TODO

* [x] Setup Server
  * [x] Install Dependencies
  * [x] Install / Setup Linter
  * [x] Setup Express App
  * [x] Setup Not Found and Error Middlewares
* [x] Model DB
  * What data will we store?
* [x] Setup Mongoose Model(s)
* [x] POST /logs
  * Create a new log entry
* [x] GET / logs
  * List all log entries
* [x] Setup Client
* [x] Create Form to add a new entry
* [x] Setup Map SDK on client
* [x] List all log entries on map
* [x] DEPLOY!

## Deployment

To run server (back-end)

```shell script
cd ./server
cp .env.example .env
npm run start
```

To run client (front-end).<br/> 

```shell script
cd ./client
cp .env.example .env
npm run build
serve -s -l 3000 build
```

Here, port `3000` corresponds with `CORS_ORIGIN=http://localhost:3000` in file `./server/.env`.<br/>
In file `./client/.env`, to obtain `REACT_APP_MAPBOX_TOKEN` visit [https://docs.mapbox.com/mapbox-gl-js/api/](https://docs.mapbox.com/mapbox-gl-js/api/)

# License

Copyright (c) 2020 Hamza Rashid

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
