const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const mongoose = require('mongoose');
const app = express();
const apiRoutes = require('./src/modules/routes/routes');

app.use(cors());

const url = "mongodb+srv://nkovalexceed:myst0347cl98@cluster0.1pxcu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true});

app.use(bodyParser.json());
app.use('/', apiRoutes)

app.listen(8080, () => {
  console.log('Starting...')
});