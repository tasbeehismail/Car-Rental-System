import { MongoClient } from 'mongodb';


const client = new MongoClient('mongodb://localhost:27017');

client.connect().then(() => {
    console.log('Connected successfully to database server');
}).catch((err) => {
    console.log('Unable to connect to database', err);
})

const db = client.db('car-rental-system');   

export default db