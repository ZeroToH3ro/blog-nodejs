require("dotenv").config();
const express = require("express");
const expressLayout = require("express-ejs-layouts");
const path = require("path");
const connectDB = require("./server/config/db");
const cookieParser = require("cookie-parser");
const MongoStore = require("connect-mongo");
const session = require("express-session");

const app = express();
const port = 8000 || process.env.PORT;
//Handle cookie and session
app.use(cookieParser());
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
    }),
  })
);
//Get data from post method
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//Set static public file
app.use(express.static(path.join(__dirname, "public")));
//Template Engine
app.use(expressLayout);
app.set("layout", "./layouts/main");
app.set("view engine", "ejs");
//Connect database
connectDB().then((r) => console.log("Connect Database Success"));
//Set routes
app.use("/", require("./server/routes/main"));
app.use("/", require("./server/routes/admin"));

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
