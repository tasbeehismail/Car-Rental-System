import express from 'express' 
import bootstrap from './src/bootstrap.js'; 
import db from './database/connection.js';

const app = express()
bootstrap(app)  
const port = 4000
app.listen(port, () => console.log(`server running on port ${port}`))  
