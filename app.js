
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

const proteinRoute = require('./routes/proteinRoute');


const proteinlog = require('./models/proteinlog');


             
const app = express();

app.use(cors());
app.use(express.static('public'));
app.use(express.json());



app.use('/', proteinRoute);


mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })

.then(() => console.log("✅ MongoDB connected successfully!"))
.catch(err => console.error("❌ MongoDB connection error:", err));

const PORT = 5000;
   app.listen(PORT, () => {
     console.log(`Server running on port ${PORT}`);
   });








