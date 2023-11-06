import Joi from 'joi';

export const reviewSchema = Joi.object({
  rating: Joi.number().required().max(5).messages({
    'number.base': 'Please enter a valid rating',
    'number.required': 'Rating is required',
    'number.max': 'Rating must be less than or equal to 5',
  }),
  feedback: Joi.string().required().messages({
    'string.pattern.base': 'Please give valid description',
    'any.required': 'Description is required',
  }),
});

export const bookPlanSchema = Joi.object({
  totalSeat: Joi.number().required().messages({
    'number.base': 'Please enter a valid seat amount',
    'number.required': 'Seat amount is required',
  }),
});
