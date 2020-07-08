import express from 'express';
import { celebrate, Joi } from 'celebrate';
import multer from 'multer';
import multerConfig from './config/multer';
import PointController from './controllers/PointController'
import ItemController from './controllers/ItemController'

//index, show, create/store, update, delete/destroy
const routes = express.Router();
const upload = multer(multerConfig);

const pointController = new PointController();
const itemController = new ItemController();

routes.get('/item', itemController.index);
routes.get('/point', pointController.index);
routes.get('/point/:id', pointController.show);

routes.post(
  '/point/create',
   upload.single('image'),
   celebrate({
     body: Joi.object().keys({
       name: Joi.string().required(),
       email: Joi.string().required().email(),
       whatsapp: Joi.number().required(),
       latitude: Joi.number().required(),
       longitude: Joi.number().required(),
       city: Joi.string().required(),
       uf: Joi.string().required().max(2),
       items: Joi.string().required(),
       //items: Joi.string().required(), /utilisar .regex()
     })
   }, {
     abortEarly: false
   }),
   pointController.create
);

export default routes;

//SEM VALIDAÇÃO (Funcioando)
// import express from 'express';
// import multer from 'multer';
// import multerConfig from './config/multer';
// import PointController from './controllers/PointController'
// import ItemController from './controllers/ItemController'

// //index, show, create/store, update, delete/destroy
// const routes = express.Router();
// const upload = multer(multerConfig);

// const pointController = new PointController();
// const itemController = new ItemController();

// routes.get('/item', itemController.index);
// routes.get('/point', pointController.index);
// routes.get('/point/:id', pointController.show);

// routes.post('/point/create', upload.single('image'), pointController.create);

// export default routes;
