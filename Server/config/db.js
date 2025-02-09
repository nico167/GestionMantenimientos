import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Conexión exitosa con MongoDB");
    } catch (error) {
        console.error("Error al conectar con MongoDB:", error);
        process.exit(1);
    }
};

export default connectDB;
