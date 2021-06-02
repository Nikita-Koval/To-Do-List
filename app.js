const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const mongoose = require('mongoose');
const app = express();
const { Schema } = mongoose;
const taskScheme = new Schema({
  text: String,
  isCheck: Boolean
});

const Task = mongoose.model("tasks", taskScheme);
app.use(cors());

const url = "mongodb+srv://nkovalexceed:myst0347cl98@cluster0.1pxcu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true});

app.use(bodyParser.json());

app.get('/allTasks', (req, res) => {
  Task.find().then(result => {
    res.send(result)
  })
})

app.post('/createTask', (req, res) => {
  const task = new Task(req.body);
  task.save().then(result => {
    res.send(result);
  })
})

app.patch('/updateTask', (req, res) => {
  Task.updateOne({_id: req.body._id}, req.body).then(result => {
    Task.find({_id: req.body._id}).then(result => {
      res.send(result)
    });
  });
});

app.delete('/deleteTask', (req, res) => {
  Task.deleteOne({_id: req.query._id}).then(result => {
    res.send(result);
  })
})

app.delete('/deleteTasks', (req, res) => {
  Task.deleteMany().then(result => {
    res.send(result);
  })
})

app.listen(8080, () => {
  console.log('Starting...')
});