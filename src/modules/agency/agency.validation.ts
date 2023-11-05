import Joi from 'joi';

export const createPlanSchema = Joi.object({
  planName: Joi.string().required().messages({
    'string.pattern.base': 'Invalid plan name',
    'any.required': 'Plan name is required',
  }),
  images: Joi.array().items(Joi.string()).required().messages({
    'array.base': 'At least one image is required',
    'array.includes': 'Images must be strings',
    'any.required': 'Images are required',
  }),
  destination: Joi.string().required().messages({
    'string.pattern.base': 'Invalid destination',
    'any.required': 'Destination is required',
  }),
  departureFrom: Joi.string().required().messages({
    'string.pattern.base': 'Invalid departure location',
    'any.required': 'Departure location is required',
  }),
  duration: Joi.string().required().messages({
    'string.pattern.base': 'Invalid duration',
    'any.required': 'Duration is required',
  }),
  meals: Joi.string().required().messages({
    'string.pattern.base': 'Invalid meals',
    'any.required': 'Meals is required',
  }),
  price: Joi.number().precision(2).required().messages({
    'number.base': 'Invalid price',
    'number.precision': 'Price must have 2 decimal places',
    'any.required': 'Price is required',
  }),
  coverLocations: Joi.array().items(
    Joi.string().messages({
      'array.base': 'At least one cover location is required',
      'array.includes': 'Cover location must be strings',
      'any.required': 'Cover location is required',
    })
  ),
  events: Joi.array()
    .items(
      Joi.string().required().messages({
        'array.base': 'At least one event is required',
        'array.includes': 'Event must be strings',
        'any.required': 'Event is required',
      })
    )
    .required(),
  notAllowed: Joi.array()
    .items(
      Joi.string().required().messages({
        'array.includes': 'Not allowed activities must be strings',
        'any.required': 'Not allowed activities is required',
      })
    )
    .optional(),
  departureTime: Joi.date().required().messages({
    'date.base': 'Invalid starting time',
    'any.required': 'Starting time is required',
  }),
  description: Joi.string().required().messages({
    'string.pattern.base': 'Invalid description',
    'any.required': 'Description is required',
  }),
  deadline: Joi.date().required().messages({
    'date.base': 'Invalid booking deadline',
    'any.required': 'Booking deadline is required',
  }),
  totalSeats: Joi.number().required().messages({
    'date.base': 'Invalid total seats',
    'any.required': 'Total seats is required',
  }),
});
