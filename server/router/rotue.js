import { Router } from 'express';

// Import all controllers
import * as controller from '../controllers/appController.js';

const router = Router();

// POST Methods
router.route('/register').post(controller.register);
// router.route('/register-mail').post();
router.route('/authenticate').post((req, res) => res.end());
router.route('/login').post(controller.verifyUser, controller.login);

// GET Methods
router.route('/user/:username').get(controller.getUser);
router.route('/generate-otp').get(controller.generateOTP);
router.route('/verify-otp').get(controller.verifyOTP);
router.route('/create-reset-session').get(controller.createResetSession);

// PUT Methods
router.route('/update-user').put(controller.updateUser);
router.route('/reset-password').put(controller.resetPassword);

export default router;
