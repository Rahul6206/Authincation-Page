

const mongoose = require('mongoose');
const URL = process.env.MONGO_URI;

mongoose.connect(URL)
    .then(()=>{console.log('Mongodb is Successfully Connected');
    }).catch((err)=>{console.log('Mongodb is not Connected The Error is',err);
    })
