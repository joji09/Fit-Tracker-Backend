const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const { authenticateJWT } = require("./middleware/auth");
const authRoutes = require("./routes/auth");
const UsersRoutes = require("./routes/users");
const playlistRoutes = require("./routes/playlist");
const WorkoutRoutes = require("./routes/workouts");
const { NotFoundError } = require("./expressError");


const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));
app.use(authenticateJWT);

// Backend Routes
app.use("/auth", authRoutes);
app.use("/users", UsersRoutes);
app.use("/playlist", playlistRoutes);
app.use("/workout", WorkoutRoutes);

app.use(function (req, res, next) {
    return next(new NotFoundError);
});

app.use(function (err, req, res, next) {
    if(process.env.NODE_ENV !== "test") console.error(err.stack);
    const status = err.status || 500;
    const message = err.message;

    return res.status(status).json({
        error: { message, status },
    });
});

module.exports = app;