const mongoose = require("mongoose");
console.log(process.env.Mongodb_URL)
mongoose.connect(process.env.Mongodb_URL, {
    useNewUrlParser: true,
}).then(() => {
    console.log("Connected Successfully");
}).catch((err) => {
    console.log(err.message);
})
