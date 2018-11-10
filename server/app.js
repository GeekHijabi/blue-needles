import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import 'dotenv';


const app = express();
const port = parseInt(process.env.PORT, 10) || 8000;

app.set('port', port);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.listen(port);
console.log(`server has started on port: ${port}`);

app.get('*', (req, res) => res.status(200).send({
    message: 'Welcome to the beginning of blue-needles.',
  }));


export default app;
