// Require env variables
require("dotenv").config({ path: "./.env" });

// Express -- node framework
const express = require("express");
// CORS = Cross Origin Resource Sharing
const cors = require("cors");
// Mongoose
const mongoose = require("mongoose");

// GraphQL
const { graphqlHTTP } = require("express-graphql");
// GraphQL Schema
const schema = require("./schema/schema");

// Initialize express app
const app = express();

// Use CORS
app.use(cors());

// Connect to MongoDB database
const connectDB = async () => {
    try {
        await mongoose.connect(
            `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.hwuiv.mongodb.net/jobs-knock-doors?retryWrites=true&w=majority`,
            {
                auth: { authSource: "admin" },
                user: process.env.DB_USER,
                pass: process.env.DB_PASS,
                useNewUrlParser: true,
                useCreateIndex: true,
                useUnifiedTopology: true,
                useFindAndModify: true,
            }
        );
    } catch (err) {
        console.log(err);
        server.close(() => process.exit(1));
    }
};

// Connect DB
connectDB();

mongoose.connection.once("open", () => {
    console.log("MongDB Connected");
});

// for parsing the req.body
app.use(express.json());

// Super Charged Graphql Endpoint -- only endpoint in the app
app.use(
    "/graphql",
    graphqlHTTP({
        schema,
        graphiql: true,
    })
);

// Root query
app.get("/", (req, res) => {
    res.send("Hello World!");
});

// Server
const server = app.listen(process.env.PORT || 5000, () => {
    console.log(`Example app listening`);
});

// Do not log error
process.on("unhandledRejection", (err, promise) => {
    console.log(`logged error: ${err}`);
    server.close(() => process.exit(1));
});
