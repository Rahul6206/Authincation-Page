const bodyParser = require('body-parser');
const express = require('express');
const cors=require('cors')
const Auth=require('./Routes/Authincation')
const itemvalidation=require('./Middlewares/itemRoute')
const Data=require('./Data/itemdata')
require('dotenv').config();
require('./Models/Database'); // Import the database connection
const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(express.json());
app.use(bodyParser.json())
app.use(cors())
app.use('/auth', Auth)

// Routes
app.get('/', (req, res) => {
    console.log('Received a GET request on /');
    
});
app.get('/item',itemvalidation,(req,res)=>{
    console.log('User Informations',req.user);
    
    res.status(200).json(Data);
    
})

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});