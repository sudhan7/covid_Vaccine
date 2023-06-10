import express from 'express';
import mongoose from 'mongoose';
import {Adminmodel} from '../models/Admin.js'
import bcrypt from 'bcrypt';
import  jwt  from 'jsonwebtoken';
import { VaccinationCenter } from '../models/Vaccination.js';

const router = express.Router();

router.post('/login', async (req, res) => {
    try {
      const { username, password } = req.body;
  
      // Check if the admin exists
      const admin = await Adminmodel.findOne({ username });
      if (admin) {
        return res.status(200).json({ message: 'User Logged in' });
      }
  
      // Compare the provided password with the hashed password in the database
      const isMatch = await bcrypt.compare(password, admin.password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
    }catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
});

router.post('/signup', async (req, res) => {
    try {
      const { username, password } = req.body;
  
      // Check if the user already exists
      const existingUser = await Adminmodel.findOne({ username });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create a new user
      const newUser = new Adminmodel({ username, password: hashedPassword });
      await newUser.save();
  
      res.status(201).json({ message: 'User created successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  });

  router.post('/add-center', async (req, res) => {
    try {
      const { name, workingHours, date } = req.body;
  
      const newCenter = new VaccinationCenter({ name, workingHours, date});
      await newCenter.save();
  
      res.status(201).json({ message: 'Vaccination center added successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  });

  router.post('/delete-center', async (req, res) => {
    const {name,date} = req.body;

    const data = await VaccinationCenter.findOneAndDelete({ name, date });
    if(data){
      res.status(200).json (data)
    }else{
      res.status(400).json({ message : 'Center Not Found'})
    }
  });
  

  router.get('/dosage-details', async (req, res) => {
    try {
      const dosageDetails = await VaccinationCenter.aggregate([
        {
          $group: {
            _id: '$centerId',
            centerName: { $first: '$name' },
            dosageCount: { $sum: { $size: '$user' } },
          },
        },
        {
          $project: {
            _id: 0,
            centerName: 1,
            dosageCount: 1,
          },
        },
      ]);
  
      res.status(200).json(dosageDetails);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });



export {router as Adminrouter}