const Task = require('../../db/models/task/index')

module.exports.getAllTasks = (req, res) => {
    Task.find().then(result => {
      res.send(result)
    });
};
  
module.exports.addNewTask = (req, res) => {
    const task = new Task(req.body);
    task.save().then(result => {
      res.send(result);
    });
};
  
module.exports.changeTask = (req, res) => {
    Task.updateOne({_id: req.body._id}, req.body).then(result => {
      Task.find({_id: req.body._id}).then(result => {
        res.send(result)
      });
    });
};
  
module.exports.deleteTask = (req, res) => {
    Task.deleteOne({_id: req.query._id}).then(result => {
      res.send(result);
    });
};
  
module.exports.deleteAll = (req, res) => {
    Task.deleteMany().then(result => {
      res.send(result);
    });
};