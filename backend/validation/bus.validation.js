import Joi from "joi";

export const busValidationSchema = Joi.object({
  busName: Joi.string().min(2).max(50).required().messages({
    "string.empty": "Bus name is required",
    "string.min": "Bus name must be at least 2 characters",
  }),

  type: Joi.string()
    .valid("AC Sleeper", "Non-AC Sleeper", "Seater", "AC Seater")
    .required()
    .messages({
      "any.only": "Invalid bus type selected",
      "string.empty": "Bus type is required",
    }),

  from: Joi.string().min(2).required().messages({
    "string.empty": "From location is required",
  }),

  to: Joi.string().min(2).required().messages({
    "string.empty": "To location is required",
  }),

  departureTime: Joi.string()
    .pattern(/^\d{1,2}:\d{2}\s?(AM|PM)$/)
    .required()
    .messages({
      "string.pattern.base": "Departure time must be like 10:30 AM",
      "string.empty": "Departure time is required",
    }),

  arrivalTime: Joi.string()
    .pattern(/^\d{1,2}:\d{2}\s?(AM|PM)$/)
    .required()
    .messages({
      "string.pattern.base": "Arrival time must be like 06:00 PM",
      "string.empty": "Arrival time is required",
    }),

  duration: Joi.string()
    .pattern(/^\d+(\.\d+)?\s?(h|hour|hours)$/i)
    .required()
    .messages({
      "string.pattern.base": "Duration must be like 5h or 5 hours",
      "string.empty": "Duration is required",
    }),

  price: Joi.number().min(0).required().messages({
    "number.base": "Price must be a number",
    "number.min": "Price cannot be negative",
  }),

  totalSeats: Joi.number().integer().min(1).required().messages({
    "number.base": "Total seats must be a number",
  }),

  bookedSeats: Joi.array()
    .items(Joi.number().integer().min(1))
    .required()
    .messages({
      "array.base": "Booked seats must be an array",
    }),

  seatsAvailable: Joi.number().integer().min(0).required().messages({
    "number.base": "Seats available must be a number",
  }),

  boardingPoints: Joi.array()
    .items(Joi.string().min(2))
    .min(1)
    .required()
    .messages({
      "array.min": "At least one boarding point is required",
    }),

  droppingPoints: Joi.array()
    .items(Joi.string().min(2))
    .min(1)
    .required()
    .messages({
      "array.min": "At least one dropping point is required",
    }),

  rating: Joi.number().min(0).max(5).default(0),

  date: Joi.date().iso().required().messages({
    "date.base": "Invalid date format",
  }),
});