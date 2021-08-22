require("dotenv").config({ path: "./.env" });
const express = require("express");
const errorHandler = require("./middleware/error");
const cors = require("cors");
const mongoose = require("mongoose");

const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");

const connectDB = async () => {
    try {
        await mongoose.connect(
            "mongodb+srv://binaryHook10:LfVQfkn0TGmdZbwx@cluster0.uabc2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
            {
                auth: { authSource: "admin" },
                user: "binaryHook10",
                pass: "LfVQfkn0TGmdZbwx",
                useNewUrlParser: true,
                useCreateIndex: true,
                useUnifiedTopology: true,
                useFindAndModify: true,
            }
        );
    } catch (err) {
        console.log(error);
    }
    console.log("MongoDB connected");
};

// Connect DB
connectDB();

const app = express();

app.use(cors());

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
