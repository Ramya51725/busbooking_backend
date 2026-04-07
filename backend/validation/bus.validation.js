import Joi from "joi";

export const busValidationSchema = Joi.object({
  busName: Joi.string().min(2).max(50).required(),

  type: Joi.string()
    .valid("AC Sleeper", "Non-AC Sleeper", "Seater", "AC Seater")
    .required(),

  from: Joi.string().min(2).required(),

  to: Joi.string().min(2).required(),

  departureTime: Joi.string()
    .pattern(/^\d{1,2}:\d{2}\s?(AM|PM)$/)
    .required(),

  arrivalTime: Joi.string()
    .pattern(/^\d{1,2}:\d{2}\s?(AM|PM)$/)
    .required(),

  duration: Joi.string()


  .pattern(/^\d+(\.\d+)?\s?(h|hour|hours)$/i)
    .required(),

  price: Joi.number().min(0).required(),

  totalSeats: Joi.number().integer().min(1).required(),

  bookedSeats: Joi.array()
    .items(Joi.number().integer().min(1))
    .required(),

  seatsAvailable: Joi.number().integer().min(0).required(),

  boardingPoints: Joi.array()
    .items(Joi.string().min(2))
    .min(1)
    .required(),

  droppingPoints: Joi.array()
    .items(Joi.string().min(2))
    .min(1)
    .required(),

  rating: Joi.number().min(0).max(5).default(0),

  date: Joi.date().iso().required()
});