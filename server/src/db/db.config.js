import mongoose from "mongoose";

const connectDB = async () => {
    try {
        let mongodbURI = process.env.MONGODB_URI;
        const projectName = "AI_Resume_Builder"

        if (!mongodbURI) {
            throw new Error("MONGODB_URI is not defined");
        }

        if (mongodbURI.endsWith('/')) {
            mongodbURI = mongodbURI.slice(0, -1);
        }

        await mongoose.connect(`${mongodbURI}/${projectName}`);
        console.log("DB connected");
    } catch (error) {
        console.log(error);
    }
};

export default connectDB;