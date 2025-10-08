import mongoose from "mongoose";

const DonateSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  token_address: {
    type: String,
    required: true,
  },
  max_amount: {
    type: Number,
    required: true,
  },
  signDelegation: {
    type: Object,
    required: true,
  },
});

export default mongoose.models.Donate || mongoose.model("Donate", DonateSchema);
