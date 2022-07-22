const express = require("express");
const userRouter = express.Router();
const { v4: uuid_v4 } = require("uuid");
const Joi = require("joi");

let users = [
    {
        id: uuid_v4(),
        name: "Bạn 1",
        phoneNumber: "111111111111111",
        email: "111111111111111@gmail.com",
        gender: "male",
        age: 11,
    },
    {
        id: uuid_v4(),
        name: "Bạn 2",
        phoneNumber: "22222222222222",
        email: "22222222222222@gmail.com",
        gender: "male",
        age: 22,
    },
    {
        id: uuid_v4(),
        name: "Bạn 3",
        phoneNumber: "333333333333333",
        email: "333333333333333@gmail.com",
        gender: "female",
        age: 33,
    },
];

const validateUser = (user) => {
    const schema = Joi.object({
        name: Joi.string()
            .pattern(/^([^0-9]*)$/, "no-number")
            .min(15)
            .required(),
        phoneNumber: Joi.string()
            .pattern(/^[0-9]+$/, "numbers-only")
            .min(10)
            .max(12),
        email: Joi.string().email(),
        gender: Joi.string().valid("male", "female", "undefined"),
        age: Joi.number().max(200),
    });
    return schema.validate(user, { abortEarly: false });
};

userRouter.get("/", (req, res) => {
    res.send(users);
});

userRouter.post("/", (req, res) => {
    const { error } = validateUser(req.body);
    res.send(error);
    console.log("error", error);
    if (error) return res.status(400).send(error.details[0].message);
    users = [
        ...users,
        {
            id: uuid_v4(),
            name: req.body.name,
            phoneNumber: req.body.phoneNumber,
            email: req.body.email,
            gender: req.body.gender,
            age: req.body.age,
        },
    ];
    res.send(users);
});

module.exports = userRouter;
