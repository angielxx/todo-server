import mongoose from 'mongoose';

const refreshTokenSchema = new mongoose.Schema({
  token: {
    type: String,
    require: true,
  },
  userId: {
    type: String,
    require: true,
  },
  expiryDate: {
    type: Date,
    require: true,
  },
});

export default mongoose.model('RefreshToken', refreshTokenSchema);
