import { StatusCodes } from "http-status-codes";

const validateBody = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body)

    if (error) {
      const messages = error.details.map((err) => err.message);

      return res.status(StatusCodes.BAD_REQUEST).json({
        message: messages[0], 
      });
    }

    next();
  };
};
export default validateBody;
