import express from 'express';
import { autenticate } from '../controllers/errorHandlingController.js';
import {
    getBookingEachCategory, getBookingEachStatus,
    getDashboard,
    getDashboardUser,
    getPaymentEachCategory, getPaymentsEachStatus
} from '../controllers/dasboardController.js';

const dashboardRouter = express.Router();

dashboardRouter.get('/admin/dashboard', autenticate, getDashboard); //admin

dashboardRouter.get('/admin/dashboard/booking', autenticate, getBookingEachCategory);

dashboardRouter.get('/admin/dashboard/bookingStatus', autenticate, getBookingEachStatus);

dashboardRouter.get('/admin/dashboard/payment', autenticate, getPaymentEachCategory);

dashboardRouter.get('/admin/dashboard/paymentStatus', autenticate, getPaymentsEachStatus);

dashboardRouter.get('/dashboard', getDashboardUser); 

export default dashboardRouter;