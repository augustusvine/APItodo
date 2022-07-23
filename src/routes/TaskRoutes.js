const express = require('express');
const router = express.Router();

const TaskController = require('../controller/TaskController');
const TaskValidation = require('../middlewares/TaskValidation');

router.post('/', TaskValidation, TaskController.create); //sempre usar o POST para cadastrar
router.put('/:id', TaskValidation, TaskController.update);
router.delete('/:id', TaskController.delete);
//router.put('/:id/:done', TaskController.done);


router.get('/:id',  TaskController.show);
router.get('/filter/all/:macaddress', TaskController.all);
router.get('/filter/late/:macaaddress',TaskController.late);
router.get('/filter/today/:macaddress',TaskController.today);
router.get('/filter/week/:macaddress',TaskController.week);
router.get('/filter/month/:macaddress',TaskController.month);
router.get('/filter/year/:macaddress',TaskController.year);


module.exports = router;

//definicao das rotas de cada parametro chamado nos filtros junto com o task controller que faz a organizacao 