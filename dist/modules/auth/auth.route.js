"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("./auth.controller");
const verifyAuth_1 = require("../../utils/auth_jwt/verifyAuth");
const router = express_1.default.Router();
router.route('/sign-up').post(auth_controller_1.authController.signUp);
router.route('/register-agency').post(auth_controller_1.authController.registerAgency);
router.route('/login').post(auth_controller_1.authController.login);
router.route('/delete-account').post(verifyAuth_1.verifyAuth, auth_controller_1.authController.deleteAccount);
router.route('/profile').get(verifyAuth_1.verifyAuth, auth_controller_1.authController.getProfileData);
exports.default = { authRouter: router };
