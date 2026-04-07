import Joi from "joi";

export const bookingSchema = Joi.object({
  busId: Joi.string().required().messages({
    "string.empty": "Bus ID is required",
  }),

  userId: Joi.string().required().messages({
    "string.empty": "User ID is required",
  }),
  busName: Joi.string().required().messages({
    "string.empty": "Bus name is required",
  }),

  status: Joi.string()
    .valid("Confirmed", "Cancelled")
    .default("Confirmed"),


  passengerDetails: Joi.array()
    .items(
      Joi.object({
        name: Joi.string().required().messages({
          "string.empty": "Passenger name is required",
        }),

        age: Joi.number().min(1).required().messages({
          "number.base": "Age must be a number",
          "number.min": "Age must be greater than 0",
        }),

        gender: Joi.string().valid("Male", "Female", "Other").required().messages({
          "any.only": "Gender must be Male, Female, or Other",
        }),

        seatNumber: Joi.number().required().messages({
          "string.empty": "Seat number is required",
        }),
      })
    )
    .min(1)
    .required()
    .messages({
      "array.min": "At least one passenger is required",
    }),

  contactDetails: Joi.object({
    phone: Joi.string()
      .pattern(/^[0-9]{10}$/)
      .required()
      .messages({
        "string.pattern.base": "Phone must be 10 digits",
        "string.empty": "Phone number is required",
      }),

    email: Joi.string().email().required().messages({
      "string.email": "Invalid email format",
      "string.empty": "Email is required",
    }),
  }).required(),

  totalAmount: Joi.number().required().messages({
    "number.base": "Total amount must be a number",
  }),

  boardingPoint: Joi.string().required().messages({
    "string.empty": "Boarding point is required",
  }),

  droppingPoint: Joi.string().required().messages({
    "string.empty": "Dropping point is required",
  }),

  travelDate: Joi.date().required().messages({
    "date.base": "Invalid travel date",
  }),
});