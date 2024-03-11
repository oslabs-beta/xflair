import mongoose from 'mongoose';

const uploadSchema = new mongoose.Schema({
    name: String,
    image: { type: Buffer },
    date: { type: Date, default: Date.now },
});

const Uploads = mongoose.model('Uploads', uploadSchema);

export default Uploads;
