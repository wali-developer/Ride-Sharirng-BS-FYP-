const express = require("express");
const publishrideRoute = require("./routes/publishride");
const app = express();
const PORT = process.env.PORT || 3001;
const mongoose = require("mongoose");
const userRoute = require("./routes/user");
const requestRideRoute = require("./routes/requestride");
const conversationRoute = require("./routes/conversation");
const messageRoute = require("./routes/message");
require("dotenv/config");
const cors = require("cors");
const fileUpload = require("express-fileupload");

app.use(fileUpload());
app.use(cors()); // to allow cross origin resource sharing
app.use(express.json()); // body parser

// to use routes
app.use("/publishride", publishrideRoute);
app.use("/user", userRoute);
app.use("/requestride", requestRideRoute);
app.use("/conversations", conversationRoute);
app.use("/messages", messageRoute);

// app.use("/static", express.static("uploads"));
const path = require("path");
app.use("/static", express.static(path.join(__dirname, "uploads")));

app.post("/upload/:id", (req, res) => {
  if (req.files) {
    const image = req.files.image;
    // const imagename = Date.now() + "_" + image.name;
    const imagename = req.params.id + ".jpg";
    let uploadPath = __dirname + "/uploads/" + imagename;

    image.mv(uploadPath, (err) => {
      if (err) {
        res.send(err);
      } else {
        res.send("Image uploaded successfully");
      }
    });
  }
});

// Connect to the Mongo DB
mongoose.connect(process.env.DB_CONNECTION, () => {
  console.log("Connected to the Database!");
});

// app listening on port: 3001
app.listen(PORT, () => console.log("Api running on :" + PORT));
