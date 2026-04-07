import { StatusCodes } from "http-status-codes";


const validateBody = (schema) => {
    return (req, res , next) => {
        const {error} = schema.validate(req.body)

        if (error) {
                  console.log("Validation Error Details:", error.details); // 👈 DEBUG
            return res.status(StatusCodes.BAD_REQUEST).json({error : error.message})
        }
        next()
    }
}

export default validateBody 