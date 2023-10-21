import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

async function connect() {
    try {
        const mongoURI = process.env.ATLAS_URI;
        const db = await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
      
        console.log('Connected Database Successfully');
        return Promise.resolve(db);
    } catch (error) {
        return Promise.reject(error);
    }
}

export default connect;
