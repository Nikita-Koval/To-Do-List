const express = require('express');
const router = express.Router();

const {
    getAllTasks,
    addNewTask,
    changeTask,
    deleteTask,
    deleteAll
} = require('../controllers/task.controller');

//Routes for tasks operations
router.get('/allTasks', getAllTasks);
router.post('/createTask', addNewTask);
router.patch('/updateTask', changeTask);
router.delete('/deleteTask', deleteTask);
router.delete('/deleteTasks', deleteAll);

module.exports = router;