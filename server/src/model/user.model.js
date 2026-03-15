import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
)

userSchema.method.comparePassword = async function(enteredPassword){
    return await bcrypt.compareSync(enteredPassword, this.password)
}

const userModel = mongoose.model("User",userSchema)

export default userModel