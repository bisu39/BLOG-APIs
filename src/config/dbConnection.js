import mongoose from 'mongoose';
export async function connectDB() {
    try {
        if (!process.env.MONGODB_URL) {
            console.error("MONGODB_URL is not defined");
            process.exit(1);
        }
        const connection = await mongoose.connect(process.env.MONGODB_URL);

        console.log(
            "MongoDB connected.",
            `Host-name: ${connection.connection.host}`,
            `DB-name: ${connection.connection.name}`)
    } catch (error) {
        console.error("MongoDB connection failed:", error.message);
        process.exit(1);
    }
}