require("dotenv").config({ path: "./.env" });
const express = require("express");
const errorHandler = require("./middleware/error");
const cors = require("cors");
const mongoose = require("mongoose");

const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");

const app = express();

app.use(cors());

const connectDB = async () => {
    try {
        await mongoose.connect(
            "mongodb+srv://knockDoors:MdMujFZz06Cf4lJO@cluster0.hwuiv.mongodb.net/jobs-knock-doors?retryWrites=true&w=majority",
            {
                auth: { authSource: "admin" },
                user: "knockDoors",
                pass: "MdMujFZz06Cf4lJO",
                useNewUrlParser: true,
                useCreateIndex: true,
                useUnifiedTopology: true,
                useFindAndModify: true,
            }
        );
    } catch (err) {
        console.log(err);
    }
};

mongoose.connection.once("open", () => {
    console.log("MongoDB connected");
});

// Connect DB
connectDB();

// for parsing the req.body
app.use(express.json());

// app.use("/api/auth", require("./routes/auth"));

// app.use("/api/private", require("./routes/private"));

app.use(
    "/graphql",
    graphqlHTTP({
        schema,
        graphiql: true,
    })
);

app.get("/", (req, res) => {
    res.send("Hello World!");
});

// Error Handle
app.use(errorHandler);

const server = app.listen(process.env.PORT || 5000, () => {
    console.log(`Example app listening`);
});

// Do not log error
process.on("unhandledRejection", (err, promise) => {
    console.log(`logged error: ${err}`);
    server.close(() => process.exit(1));
});
