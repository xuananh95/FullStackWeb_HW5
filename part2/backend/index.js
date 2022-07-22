const express = require("express");
const userRouter = require("./router/userRouter");
var cors = require("cors");
const app = express();
const PORT = 5000;

app.use(cors());

app.use(express.json());
app.use("/api/user", userRouter);

app.listen(PORT, () => {
    console.log("Server started successfully");
});
