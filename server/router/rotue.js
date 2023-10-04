import { Router } from 'express';

// Import all controllers
import * as controller from '../controllers/appController.js';
import * as middleware from '../middleware/middleware.js';
import sendMail from '../controllers/mailer.js';

const router = Router();

// POST Methods
router.route('/register').post(controller.register);
router.route('/send-mail').post(sendMail);
router.route('/authenticate').post(middleware.verifyUser, (req, res) => res.end());
router.route('/login').post(middleware.verifyUser, controller.login);

// GET Methods
router.route('/user/:username').get(controller.getUser);
router.route('/generate-otp').get(middleware.verifyUser, middleware.localVariables, controller.generateOTP);
router.route('/verify-otp').get(middleware.verifyUser, controller.verifyOTP);
router.route('/create-reset-session').get(controller.createResetSession);

// PUT Methods
router.route('/update-user').put(middleware.auth, controller.updateUser);
router.route('/reset-password').put(middleware.verifyUser, controller.resetPassword);

export default router;
