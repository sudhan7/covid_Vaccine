import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  center: [{centername:String,date:String}]
});

export const Usersmodel = mongoose.model('Users', userSchema);