import express from 'express'
import logger from '../logger/index.mjs';
import { placeUserData } from '../middlewares.mjs';
import TaskModel from '../db/Models/TaskModel.mjs'
import TaskActivityModel from '../db/Models/TaskActivityModel.mjs'
import { TASK_COLOR_DEFAULT } from '../db/Schemas/constants.mjs';
import mongoose from '../db/connection.mjs';

const tasksRouter = express.Router();

tasksRouter.post('/tasks', placeUserData, async (req, res, next) => {
    const { userId } = res.locals;
    const task = new TaskModel();
    const body = req.body || {};

    task.title = body.title;
    task.color = body.color || TASK_COLOR_DEFAULT;
    task.notes = body.notes || null;
    task.repeatedActivityAt = body.repeatedActivityAt || null;
    task.completeBy = body.completeBy || null;
    task.userRef = userId;
    try {
        await task.save();
        res.end(JSON.stringify(task));
    } catch(err) {
        next(err)
    }
})
tasksRouter.get('/tasks', placeUserData, async (req, res) => {
    const { userId } = res.locals;
    try {
        const tasks = await TaskModel.getTasksByUserId(userId, req.query);
        res.end(JSON.stringify(tasks));
    } catch(err) {
        next(err)
    }
})



tasksRouter.get('/tasks/:id', placeUserData, async (req, res) => {
    const { userId } = res.locals;
    const taskId = req.params.id;
    let task = null;
    try {
        task = await task.getOneTaskByIdAndUserId(taskId, userId);
    } catch (err) {
        logger.error(`Cannot retrieve task from DB. userId: ${userId}; taskId: ${taskId} `)
        next(err);
        return;
    }
    
    if (!task) {
        res.status(404).end('Not Found.');
        
    } else {
        res.end(JSON.stringify(task));
    } 
})

tasksRouter.get('/tasks/:id/activity', async (req, res) => {
    const { userId } = res.locals;
    const taskId = req.params.id;

    try {
        const activities = await TaskActivityModel.getActivityListForTaskId(taskId, userId, req.query);
        res.end(JSON.stringify(activities))
    } catch (err) {
        next(err)
    }
})

tasksRouter.patch('/task/:id', placeUserData, (req, res) => {
    throw new Error('Not implemented!');
})

tasksRouter.delete('/task/:id', placeUserData, async (req, res) => {
    const { userId } = res.locals;
    const taskId = req.params.id;
    let task = null;
    try {
        task = await task.deleteOneTaskByIdAndUserId(taskId, userId);
        if (!task) {
            res.status(400).end('Bad request.');
        } else {
            res.end(JSON.stringify(task));
        } 
    } catch (err) {
        logger.error(`Error ${err.message}`)
        logger.error(`Cannot delete task from DB. userId: ${userId}; taskId: ${taskId} `)
        
        next(err)
    }
    

})

export default tasksRouter;