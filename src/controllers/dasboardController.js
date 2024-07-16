import sequelize from 'sequelize';
import Product from '../models/productModel.js';
import User from '../models/userModel.js';
import Booking from '../models/bookingModel.js';
import Payment from '../models/paymentModel.js';
import Order from '../models/orderModel.js';
import Review from '../models/reviewModel.js';
import Category from "../models/categoryModel.js";

// const countByBookingStatus = async (status) => {
//   return await Booking.count({
//     where: {
//       bookingStatus: status,
//     },
//   });
// };

const getDashboard = async (req, res, next) => {
  try {
    const productCount = await Product.count();
    const userCount = await User.count();
    const bookingCount = await Booking.count();
    const paymentCount = await Payment.count();
    const orderCount = await Order.count();
    const reviewCount = await Review.count();
    const averageRatingResult = await Review.findAll({
      attributes: [[sequelize.fn('AVG', sequelize.col('rating')), 'rating']],
    });
    const averageRating = parseFloat(averageRatingResult[0].rating).toFixed(2);

    res.status(200).json({
      productCount,
      userCount,
      bookingCount,
      paymentCount,
      orderCount,
      reviewCount,
      averageRating: parseFloat(averageRating),
    });
  } catch (error) {
    next(
      new Error('controllers/fotoController.js:getDashboard - ' + error.message)
    );
  }
};

const getBookingEachCategory = async (req, res, next) => {
  const { bookingStatus } = req.query;

  try {
    const whereClause = bookingStatus ? { bookingStatus } : {};

    const totalBooking = await Category.findAll({
      attributes: [
        'category',
        [sequelize.fn('COUNT', sequelize.col('Products.Bookings.booking_id')), 'totalBookings'],
      ],
      include: [
        {
          model: Product,
          attributes: [],
          include: [
            {
              model: Booking,
              attributes: [],
              where: whereClause,
            },
          ],
        },
      ],
      group: ['category'],
      raw: true,
    });

    return res.status(200).json({
      errors: [],
      message: 'Get all booking each category success',
      data: totalBooking,
    });

  } catch (error) {
    next(
        new Error('controllers/bookingController.js:getBookingByCategory - ' + error.message)
    );
  }
};

const getBookingEachStatus = async (req, res, next) => {
  try {
    const bookingCount = await Booking.findAll({
      attributes: [
        'bookingStatus',
        [sequelize.fn('COUNT', sequelize.col('booking_id')), 'totalBookings']
      ],
      group: ['bookingStatus'],
      raw: true,
    });

    return res.status(200).json({
      errors: [],
      message: 'Get booking count by status success',
      data: bookingCount,
    });

  } catch (error) {
    next(
        new Error('controllers/paymentController.js:getBookingByStatus - ' + error.message)
    );
  }
};

const getPaymentEachCategory = async (req, res, next) => {
  const { paymentStatus } = req.query;

  try {
    const whereClause = paymentStatus ? { paymentStatus } : {};

    const totalPayment = await Category.findAll({
      attributes: [
        'category',
        [sequelize.fn('COUNT', sequelize.col('Products.Bookings.Payment.payment_id')), 'totalPayments'],
      ],
      include: [
        {
          model: Product,
          attributes: [],
          include: [
            {
              model: Booking,
              attributes: [],
              include: {
                model: Payment,
                attributes: [],
                where: whereClause,
              }
            },
          ],
        },
      ],
      group: ['category'],
      raw: true,
    });

    return res.status(200).json({
      errors: [],
      message: 'Get all booking each category success',
      data: totalPayment,
    });

  } catch (error) {
    next(
        new Error('controllers/bookingController.js:getPaymentByCategory - ' + error.message)
    );
  }
};

const getPaymentsEachStatus = async (req, res, next) => {
  try {
    const paymentCount = await Payment.findAll({
      attributes: [
        'paymentStatus',
        [sequelize.fn('COUNT', sequelize.col('payment_id')), 'totalPayments']
      ],
      group: ['paymentStatus'],
      raw: true,
    });

    return res.status(200).json({
      errors: [],
      message: 'Get payment count by status success',
      data: paymentCount,
    });

  } catch (error) {
    next(
        new Error('controllers/paymentController.js:getPaymentsByStatus - ' + error.message)
    );
  }
};

const getDashboardUser = async (req, res, next) => {
  try {
    const productCount = await Product.count();
    const userCount = await User.count();
    const averageRatingResult = await Review.findAll({
      attributes: [[sequelize.fn('AVG', sequelize.col('rating')), 'rating']],
    });
    const averageRating = parseFloat(averageRatingResult[0].rating).toFixed(2);

    res.status(200).json({
      productCount,
      userCount,
      averageRating: parseFloat(averageRating),
    });
  } catch (error) {
    next(
      new Error('controllers/fotoController.js:getDashboardUser - ' + error.message)
    );
  }
};

export { getDashboard, getDashboardUser, getBookingEachCategory, getPaymentEachCategory, getPaymentsEachStatus, getBookingEachStatus };
