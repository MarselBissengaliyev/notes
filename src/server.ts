import app from "./app";
import env from "./util/validateEnv";
import mongoose from "mongoose";

const port = env.PORT;

mongoose
  .connect(env.MONGO_CONNECTION_STRING)
  .then(() => {
    console.log("Mongoose connected");
    app.listen(port || 4444, () => {
      console.log("Server running on port: " + (port || 4444));
    });
  })
  .catch(console.error);
