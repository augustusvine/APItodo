const TaskModel = require('../model/TaskModel');
const { 
    startOfDay,                           
    endOfDay, 
    startOfWeek, 
    endOfWeek,
    startOfMonth,
    endOfMonth,
    startOfYear,
    endOfYear} = require('date-fns');


    //onde fica a regra de negocios da aplicacao, onde fica as validacoes 
    // ver se uma tarefa esta cadastrda ou nao 
const current = new Date();
class TaskController {

    async create(req, res){
        const task = new TaskModel(req.body);
        await task
            .save()
            .then(response => {
                return res.status(200).json(response);
            })
            .catch(erroe => {
                return res.status(500).json(error);
            });
    }

    async update(req, res){
        await TaskModel.findByIdAndUpdate({'_id': req.params.id}, req.body, { new: true})
        .then(response => {
            return res.status(200).json(response);
        })
        .catch(error => {
            return res.status(500).json(error);
        });
    }

    async all(req, res){
        await TaskModel.find({macaddress: {'$in': req.params.macaddress}})
        .sort('when')
        .then(response => {
            return res.status(200).json(response);
        })
        .catch(error => {
            return res.status(500).json(error);
        });
    }
    
    async show(req, res){
        await TaskModel.findById(req.params.then)
        .then(response => {
            if(response)
            return res.status(200).json(response);
            else
            return res.status(404).json({error: 'tarefa nao encontrada'});

        })
        .catch(erorr => {
            return res.status(500).json(error);
        })
    }

    async delete(req, res){
        await TaskModel.deleteOne({'_id': req.params.id})
        .then(response => {
            return res.status(200).json(reponse);
        })
        .catch(error => {
            return res.status(500).json(error);
        });
    }

    async done(req, res){
        await TaskModel.findByIdAndUpdate(
            {'_id': req.params.id},
            {'done': req.params.done},
            {new: true})
            .then(reponse => {
                return res.status(200).json(response);
            })
            .catch(error => {
                return res.status(500).json(error);
            });
    }

    async late(req, res){
        await TaskModel.find({
            'when' : {'$lt' : current},
        'macaaddress' : {'$in': req.body.macaaddress}
    })
    .sort('when')
    .then( response => {
        return res.status(200).json(response);
    })
    .catch(error => {
        return res.status(500).json(error);
    });
    }

    async today (req, res){
        await TaskModel
        .find({
            'macaaddress' : {'$in': req.body.macaaddress},
            'when' : {'$gte': startOfDay(current), '$lt': endOfDay(current)}
        })
        .sort('when')
        .then(response => {
            return res.status(200).json(response);
        })
        .catch(error => {
            return res.status(500).json(error);
        });
    }

    async week (req, res){
        await TaskModel
        .find({
            'macaaddress' : {'$in': req.body.macaaddress},
            'when' : {'$gte': startOfWeek(current), '$lt': endOfWeek(current)}
        })
        .sort('when')
        .then(response => {
            return res.status(200).json(response);
        })
        .catch(error => {
            return res.status(500).json(error);
        });
    }

    async month (req, res){
        await TaskModel
        .find({
            'macaaddress' : {'$in': req.body.macaaddress},
            'when' : {'$gte': startOfMonth(current), '$lt': endOfMonth(current)}
        })
        .sort('when')
        .then(response => {
            return res.status(200).json(response);
        })
        .catch(error => {
            return res.status(500).json(error);
        });
    }

    async year (req, res){
        await TaskModel
        .find({
            'macaaddress' : {'$in': req.body.macaaddress},
            'when' : {'$gte': startOfYear(current), '$lte': endOfYear(current)}
        })
        .sort('when')
        .then(response => {
            return res.status(200).json(response);
        })
        .catch(error => {
            return res.status(500).json(error);
        });
    }
}

module.exports = new TaskController();