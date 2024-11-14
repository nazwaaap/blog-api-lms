import { validationResult } from 'express-validator';

export const validateRequest = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            message: "Bad request!",
            errors: errors.array()
        });
    }

    next(); 
};
