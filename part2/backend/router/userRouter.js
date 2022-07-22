const express = require("express");
const userRouter = express.Router();
const { v4: uuid_v4 } = require("uuid");
const Joi = require("joi");

const validateUser = (user) => {
    const schema = Joi.object({
        firstName: Joi.string().required().label("First name"),
        lastName: Joi.string().required().label("Last name"),
        birthday: Joi.number().required().min(0).label("Birthday"),
        gender: Joi.string().valid("male", "female"),
        email: Joi.string().email().label("Email"),
        phoneNumber: Joi.string()
            .pattern(/^[0-9]+$/, "numbers-only")
            .min(10)
            .max(12)
            .label("Phone number"),
    });
    return schema.validate(user, { abortEarly: false });
};

userRouter.get("/", (req, res) => {
    res.send(users);
});

userRouter.post("/", (req, res) => {
    const { error } = validateUser(req.body);
    if (error) {
        return res.status(400).send(error);
    } else {
        let user = {
            id: uuid_v4(),
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            phoneNumber: req.body.phoneNumber,
            email: req.body.email,
            gender: req.body.gender,
        };
        res.send(user);
    }
});

module.exports = userRouter;
