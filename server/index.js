const express = require("express");
const app = express();
const routUser = require("./routes/authRoute")
const cookie = require("cookie-parser")



app.use(express.json())
app.use(cookie())
app.use(routUser)
const Port = process.env.PORT || 4000;
app.listen(Port, () => console.log("Server running......"));