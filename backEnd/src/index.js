require('dotenv').config();
const express = require("express");
const helmet = require('helmet');
const path = require("path");
const productRoutes = require("./router/productRoutes");
const userRoutes = require("./router/userRoutes");
const orderRoutes = require("./router/orderRoutes");
const orderItemRoutes = require("./router/orderItemRoutes");
const cartRoutes = require("./router/cartRoutes");
const cartItemRoutes = require("./router/cartItemRoutes");
const noveltieRoutes = require("./router/noveltieRoutes");
const contactUsRoutes = require("./router/contactUsRoutes");
const checkoutRoutes = require("./router/checkoutRoutes");

const app = express();

const cors = require('cors');
app.use(cors());

const port = 3000;


app.use(express.json());

app.use(
    helmet.contentSecurityPolicy({
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", "data:", "http://localhost:3000"],
        connectSrc: ["'self'", "http://localhost:3000", "http://localhost:5173"],
        fontSrc: ["'self'", "data:"],
        objectSrc: ["'none'"],
        upgradeInsecureRequests: [],
      },
    })
);


app.use(express.static(path.join(__dirname, "public")));


app.use("/api", productRoutes);
app.use("/api", userRoutes);
app.use("/api", orderRoutes);
app.use("/api", orderItemRoutes);
app.use("/api", cartRoutes);
app.use("/api", cartItemRoutes);
app.use("/api", noveltieRoutes);
app.use("/api", contactUsRoutes);
app.use("/api", checkoutRoutes); 

app.listen(port, function() {
    console.log(`Server started on port ${port}`);
});
