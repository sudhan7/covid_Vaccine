import mongoose from 'mongoose';

const vaccinationCenterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  workingHours: {
    type: String,
    required: true,
  },
  date:{
    type:String,
    required: true
  },

  user: [{id:String,username:String}]
});

export const VaccinationCenter = mongoose.model('VaccinationCenter', vaccinationCenterSchema);
