import Joi from 'joi';

const userSchema = Joi.object({
    name: Joi.string().required().messages({
        'string.empty': 'Name cannot be empty',
        'any.required': 'Name is required'
    }),
    email: Joi.string().email().required().messages({
        'string.email': 'Invalid email format',
        'string.empty': 'Email cannot be empty',
        'any.required': 'Email is required'
    }),
    password: Joi.string().min(6).required().messages({
        'string.min': 'Password must be at least 6 characters',
        'string.empty': 'Password cannot be empty',
        'any.required': 'Password is required'
    }),
    role: Joi.string().valid('user', 'admin').default('user')
});

export { userSchema };
