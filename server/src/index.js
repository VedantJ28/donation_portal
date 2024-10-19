import dotenv from "dotenv";
import { connectdb } from "./db/db.js";
import { app } from "./app.js";

dotenv.config();

connectdb()
  .then(() => {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Listning on port : ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("MongoDB connection error!!!", error);
  });

app.get("/", (req, res) => {
  res.send("<h1>Hello World!</h1>");
});
