'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.updatePlanSchema = exports.createPlanSchema = void 0;
const joi_1 = __importDefault(require('joi'));
exports.createPlanSchema = joi_1.default.object({
  planName: joi_1.default.string().required().messages({
    'string.pattern.base': 'Invalid plan name',
    'any.required': 'Plan name is required',
  }),
  images: joi_1.default
    .array()
    .items(joi_1.default.string())
    .required()
    .messages({
      'array.base': 'At least one image is required',
      'array.includes': 'Images must be strings',
      'any.required': 'Images are required',
    }),
  destination: joi_1.default.string().required().messages({
    'string.pattern.base': 'Invalid destination',
    'any.required': 'Destination is required',
  }),
  departureFrom: joi_1.default.string().required().messages({
    'string.pattern.base': 'Invalid departure location',
    'any.required': 'Departure location is required',
  }),
  duration: joi_1.default.string().required().messages({
    'string.pattern.base': 'Invalid duration',
    'any.required': 'Duration is required',
  }),
  meals: joi_1.default.string().required().messages({
    'string.pattern.base': 'Invalid meals',
    'any.required': 'Meals is required',
  }),
  price: joi_1.default.number().precision(2).required().messages({
    'number.base': 'Invalid price',
    'number.precision': 'Price must have 2 decimal places',
    'any.required': 'Price is required',
  }),
  coverLocations: joi_1.default.array().items(
    joi_1.default.string().messages({
      'array.base': 'At least one cover location is required',
      'array.includes': 'Cover location must be strings',
      'any.required': 'Cover location is required',
    })
  ),
  events: joi_1.default
    .array()
    .items(
      joi_1.default.string().required().messages({
        'array.base': 'At least one event is required',
        'array.includes': 'Event must be strings',
        'any.required': 'Event is required',
      })
    )
    .required(),
  notAllowed: joi_1.default
    .array()
    .items(
      joi_1.default.string().required().messages({
        'array.includes': 'Not allowed activities must be strings',
        'any.required': 'Not allowed activities is required',
      })
    )
    .optional(),
  departureTime: joi_1.default.date().required().messages({
    'date.base': 'Invalid starting time',
    'any.required': 'Starting time is required',
  }),
  description: joi_1.default.string().required().messages({
    'string.pattern.base': 'Invalid description',
    'any.required': 'Description is required',
  }),
  deadline: joi_1.default.date().required().messages({
    'date.base': 'Invalid booking deadline',
    'any.required': 'Booking deadline is required',
  }),
  totalSeats: joi_1.default.number().required().messages({
    'date.base': 'Invalid total seats',
    'any.required': 'Total seats is required',
  }),
});
exports.updatePlanSchema = joi_1.default.object({
  notAllowed: joi_1.default.array().items(
    joi_1.default.string().messages({
      'array.includes': 'Not allowed activities must be strings',
    })
  ),
  description: joi_1.default.string().messages({
    'string.pattern.base': 'Invalid description',
  }),
  totalSeats: joi_1.default.number().messages({
    'number.base': 'Invalid total seats',
  }),
});
