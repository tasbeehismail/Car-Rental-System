import express from 'express' 
import bootstrap from './src/bootstrap.js'; 
import db from './database/connection.js';

const app = express()

bootstrap(app)  

await db();

const port = 3000
app.listen(port, () => console.log(`server running on port ${port}`))  
