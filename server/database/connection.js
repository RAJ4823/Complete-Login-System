import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

async function connect() {
    const mongod = await MongoMemoryServer.create();
    const mongoURI = await mongod.getUri();

    const db = await mongoose.connect(mongoURI);
    console.log('Database Connceted');
    return db;
}

export default connect;
