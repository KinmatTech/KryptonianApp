import mongoose from 'mongoose';

const ImageSchema = new mongoose.Schema({
    filename: { type: String, required: true },
    data: { type: String, required: true },
    kryptonian: { type: mongoose.Schema.Types.ObjectId, ref: 'Kryptonian', required: true }
});

const Image = mongoose.model('Image', ImageSchema);
export default router = Image;
