import express from 'express';
import { autenticate } from '../controllers/errorHandlingController.js';
import {
  getAllPaymentAdmin,
  getPaymentById,
  getPaymentDetailAdmin,
  setBankPayment,
  setWisePayment,
  updateBankWiseMethodPayment,
  updatePaymentAdmin,
} from '../controllers/paymentController.js';
import { upload } from '../middleware/multer_firebase.js';

const paymentRouter = express.Router();

paymentRouter.patch('/payment', autenticate, updateBankWiseMethodPayment);

paymentRouter.post(
  '/payment/bank',
  autenticate,
  upload.single('imageProofTransfer'),
  setBankPayment
);

paymentRouter.post(
  '/payment/wise',
  autenticate,
  upload.single('imageProofTransfer'),
  setWisePayment
);

paymentRouter.get('/admin/payment', autenticate, getAllPaymentAdmin); //admin

paymentRouter.get(
  '/admin/payment/:paymentId',
  autenticate,
  getPaymentDetailAdmin
); //admin

paymentRouter.post('/admin/payment/:paymentId', autenticate, updatePaymentAdmin); //admin

paymentRouter.get('/payment/:bookingId', autenticate, getPaymentById);

export default paymentRouter;
