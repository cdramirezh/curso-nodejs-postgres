const express = require('express');
const cors = require('cors');
const routerApi = require('./src/routes');
const { checkApiKey } = require('./src/middlewares/auth.handler');

const { logErrors, errorHandler, boomErrorHandler, queryErrorHandler } = require('./src/middlewares/error.handler');

// this invokes and executes the file that links the strategies to passport
require('./src/utils/auth/index');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const whitelist = ['http://localhost:8080', 'https://myapp.co'];
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('no permitido'));
    }
  }
}
// app.use(cors(options));
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hola mi server en express');
});

app.get('/nueva-ruta',
  checkApiKey,
  (req, res) => {res.send('Hola, soy una nueva ruta');}
);

routerApi(app);

app.use(logErrors);
app.use(queryErrorHandler)
app.use(boomErrorHandler);
app.use(errorHandler);


app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log('Mi port' +  port);
});
