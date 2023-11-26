import Joi from 'joi';

export const signUpSchema = Joi.object({
  email: Joi.string()
    .pattern(new RegExp('^\\S+@\\S+\\.\\S+$'))
    .required()
    .messages({
      'string.pattern.base': 'Please enter a valid email address',
      'any.required': 'Email is required',
    }),
  password: Joi.string().min(6).max(16).required().messages({
    'string.min': 'Password must be at least {#limit} characters long',
    'string.max': 'Password cannot exceed {#limit} characters',
    'any.required': 'Password is required',
  }),
});

export const agencyRegisterSchema = Joi.object({
  email: Joi.string()
    .pattern(new RegExp('^\\S+@\\S+\\.\\S+$'))
    .required()
    .messages({
      'string.pattern.base': 'Please enter a valid email address',
      'any.required': 'Email is required',
    }),
  password: Joi.string().min(6).max(16).required().messages({
    'string.min': 'Password must be at least {#limit} characters long',
    'string.max': 'Password cannot exceed {#limit} characters',
    'any.required': 'Password is required',
  }),
  name: Joi.string().required().messages({
    'string.pattern.base': 'Invalid Name',
    'any.required': 'Name is required',
  }),
  contactNo: Joi.string().required().messages({
    'string.pattern.base': 'Invalid contact number',
    'any.required': 'Contact number is required',
  }),
  profileImg: Joi.string().required().messages({
    'string.pattern.base': 'Invalid profile image',
    'any.required': 'Profile image is required',
  }),
  location: Joi.string().required().messages({
    'string.pattern.base': 'Invalid location',
    'any.required': 'Location is required',
  }),
  about: Joi.string().required().messages({
    'string.pattern.base': 'Invalid about',
    'any.required': 'About is required',
  }),
});

export const updateAgencyProfileSchema = Joi.object({
  name: Joi.string().optional().messages({
    'string.pattern.base': 'Please enter a valid name',
  }),
  profileImg: Joi.string().optional().messages({
    'string.pattern.base': 'Please enter a valid url',
  }),
  contactNo: Joi.string().optional().messages({
    'string.pattern.base': 'Invalid contact number',
  }),
  location: Joi.string().optional().messages({
    'string.pattern.base': 'Invalid location',
  }),
  about: Joi.string().optional().messages({
    'string.pattern.base': 'Please enter a valid info',
  }),
}).or('name', 'profileImg', 'contactNo', 'location', 'about');

export const updateUserProfileSchema = Joi.object({
  name: Joi.string().optional().messages({
    'string.pattern.base': 'Please enter a valid name',
  }),
  profileImg: Joi.string().optional().messages({
    'string.pattern.base': 'Please enter a valid url',
  }),
  contactNo: Joi.string().optional().messages({
    'string.pattern.base': 'Invalid contact number',
  }),
  about: Joi.string().optional().messages({
    'string.pattern.base': 'Please enter a valid info',
  }),
}).or('name', 'profileImg', 'contactNo', 'about');
