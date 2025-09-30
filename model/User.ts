import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
  smart_address: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
