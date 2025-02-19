const path = require("path");
const ProteinLog=require('../models/proteinlog')

const layout=async(req, res) =>{
    res.sendFile(path.join(__dirname, "public", "index.html"));
  }

  const addentry=async(req,res)=>{
    const { date, food, quantity, protein, carbs } = req.body;
    try {
      const newEntry = new ProteinLog({ date, food, quantity, protein, carbs });
      console.log(newEntry)
      await newEntry.save();
      res.status(201).json({ message: "Entry added successfully!" });
    } catch (error) {
      res.status(500).json({ error: "Failed to add entry." });
    }
  }

  const  getentry=async(req,res)=>{
    try {
        const entries = await ProteinLog.find();
        res.status(200).json(entries);
      } catch (error) {
        res.status(500).json({ error: "Failed to fetch entries." });
      }
  }

  const deleteentry=async(req,res)=>{
    try {
        await ProteinLog.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Entry deleted successfully." });
      } catch (error) {
        res.status(500).json({ error: "Failed to delete entry." });
      }
  }

  module.exports={
    layout,addentry,getentry,deleteentry
  }