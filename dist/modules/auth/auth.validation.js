"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserProfileSchema = exports.updateAgencyProfileSchema = exports.agencyRegisterSchema = exports.signUpSchema = exports.loginSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.loginSchema = joi_1.default.object({
    email: joi_1.default.string()
        .pattern(new RegExp('^\\S+@\\S+\\.\\S+$'))
        .required()
        .messages({
        'string.pattern.base': 'Please enter a valid email address',
        'any.required': 'Email is required',
    }),
    password: joi_1.default.string().min(6).max(16).required().messages({
        'string.min': 'Password must be at least {#limit} characters long',
        'string.max': 'Password cannot exceed {#limit} characters',
        'any.required': 'Password is required',
    }),
});
exports.signUpSchema = joi_1.default.object({
    email: joi_1.default.string()
        .pattern(new RegExp('^\\S+@\\S+\\.\\S+$'))
        .required()
        .messages({
        'string.pattern.base': 'Please enter a valid email address',
        'any.required': 'Email is required',
    }),
    password: joi_1.default.string().min(6).max(16).required().messages({
        'string.min': 'Password must be at least {#limit} characters long',
        'string.max': 'Password cannot exceed {#limit} characters',
        'any.required': 'Password is required',
    }),
    confirmPassword: joi_1.default.string().min(6).max(16).required().messages({
        'string.min': 'Confirm password must be at least {#limit} characters long',
        'string.max': 'Confirmed password cannot exceed {#limit} characters',
        'any.required': 'Confirmed password  is required',
    }),
});
exports.agencyRegisterSchema = joi_1.default.object({
    email: joi_1.default.string()
        .pattern(new RegExp('^\\S+@\\S+\\.\\S+$'))
        .required()
        .messages({
        'string.pattern.base': 'Please enter a valid email address',
        'any.required': 'Email is required',
    }),
    password: joi_1.default.string().min(6).max(16).required().messages({
        'string.min': 'Password must be at least {#limit} characters long',
        'string.max': 'Password cannot exceed {#limit} characters',
        'any.required': 'Password is required',
    }),
    name: joi_1.default.string().required().messages({
        'string.pattern.base': 'Invalid Name',
        'any.required': 'Name is required',
    }),
    contactNo: joi_1.default.string().required().messages({
        'string.pattern.base': 'Invalid contact number',
        'any.required': 'Contact number is required',
    }),
    profileImg: joi_1.default.string().required().messages({
        'string.pattern.base': 'Invalid profile image',
        'any.required': 'Profile image is required',
    }),
    location: joi_1.default.string().required().messages({
        'string.pattern.base': 'Invalid location',
        'any.required': 'Location is required',
    }),
    about: joi_1.default.string().required().messages({
        'string.pattern.base': 'Invalid about',
        'any.required': 'About is required',
    }),
});
exports.updateAgencyProfileSchema = joi_1.default.object({
    name: joi_1.default.string().optional().messages({
        'string.pattern.base': 'Please enter a valid name',
    }),
    profileImg: joi_1.default.string().optional().messages({
        'string.pattern.base': 'Please enter a valid url',
    }),
    contactNo: joi_1.default.string().optional().messages({
        'string.pattern.base': 'Invalid contact number',
    }),
    location: joi_1.default.string().optional().messages({
        'string.pattern.base': 'Invalid location',
    }),
    about: joi_1.default.string().optional().messages({
        'string.pattern.base': 'Please enter a valid info',
    }),
}).or('name', 'profileImg', 'contactNo', 'location', 'about');
exports.updateUserProfileSchema = joi_1.default.object({
    name: joi_1.default.string().optional().messages({
        'string.pattern.base': 'Please enter a valid name',
    }),
    profileImg: joi_1.default.string().optional().messages({
        'string.pattern.base': 'Please enter a valid url',
    }),
    contactNo: joi_1.default.string().optional().messages({
        'string.pattern.base': 'Invalid contact number',
    }),
    about: joi_1.default.string().optional().messages({
        'string.pattern.base': 'Please enter a valid info',
    }),
}).or('name', 'profileImg', 'contactNo', 'about');
