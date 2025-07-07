const router = require('express').Router();
const User = require('../models/user');
const List = require('../models/list');

//create
router.post('/addTask', async (req,res) => {
    try{
        const {title,body,email} = req.body;
        const existingUser = await User.findOne({email});
        if(existingUser){
            const newTask = new List({ title,body,user:existingUser});
            await newTask.save();
            existingUser.list.push(newTask);
            await existingUser.save();
            res.status(200).json({newTask});
        } else {
            res.status(404).json({message: "User not found"});
        }
    } catch(err){
        res.status(400).json({message: "Error creating task"});
    }
});

//get all tasks
router.get('/getTasks/:email', async (req,res) => {
    try{
        const user = await User.findOne({email: req.params.email}).populate('list');
        if(user){
            res.status(200).json({tasks: user.list});
        } else {
            res.status(404).json({message: "User not found"});
        }
    } catch(err){
        res.status(400).json({message: "Error fetching tasks"});
    }
});

//update
router.put('/updateTask/:id', async (req,res) => {
    try{
        const {title,body,email} = req.body;
        const existingUser = await User.findOne({email});
        if(existingUser){
            const list = await List.findByIdAndUpdate(req.params.id,{title,body}, {new: true});
            res.status(200).json({message:"Task updated", task: list});
        } else {
            res.status(404).json({message: "User not found"});
        }
    } catch(err){
        res.status(400).json({message: "Error updating task"});
    }
});

//delete
router.delete('/deleteTask/:id', async (req,res) => {
    try{
        const { email } = req.body;
        const existingUser = await User.findOneAndUpdate({email},{$pull:{list:req.params.id}});
        if(existingUser){
            await List.findByIdAndDelete(req.params.id);
            res.status(200).json({message:"Task deleted"});
        } else {
            res.status(404).json({message: "User not found"});
        }
    } catch(err){
        res.status(400).json({message: "Error deleting task"});
    }
});

module.exports = router;