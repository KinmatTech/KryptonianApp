import mongoose from 'mongoose';

const kryptonianSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isConfirmed: { type: Boolean, default: false },
    apiKey: { type: String, unique: true, sparse: true },
    images: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Image' }]
});

const Kryptonian = mongoose.model('Kryptonian', kryptonianSchema);

export default Kryptonian;