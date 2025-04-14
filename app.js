const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");
const Mydata = require("./models/myDataSchema");
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  //   res.send('Hello World!')
  res.sendFile("./views/home.html", { root: __dirname });
});

mongoose
  .connect(
    //all-data اسم قاعدة البيانات
    //qPyEIWtaGPysNBlD هو كلمة المرور
    //khyranhany هو اسم المستخدم
    "mongodb+srv://khyranhany:qPyEIWtaGPysNBlD@cluster0.3u7bryt.mongodb.net/all-data?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    app.listen(port, () => {
      console.log(`http://localhost:${port}/`);
    });
  })
  .catch((err) => {
    console.log(err)
  });


  app.post('/', (req, res) => {
    console.log(req.body)
    const myData = new Mydata(req.body);
    myData.save().then(() => {
      res.redirect('/');
    }).catch((err) => {
      console.log(err);
      res.status(400).send("Unable to save data");
    });
    
  });
