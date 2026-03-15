import userModel from "../model/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import resumeModel from "../model/resume.model.js";

const generateToken = async (userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  return token;
};

// ============Register User ===============
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password)
      return res.status(400).json({ message: "All fields are required" });

    const existingName = await userModel.findOne({ name });
    if (existingName)
      return res
        .status(400)
        .json({ message: "User name already exists !! Try other.." });

    const existingUser = await userModel.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await userModel.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = await generateToken(newUser._id);

    newUser.password = undefined;
    res.cookie("token", token, { maxAge: 24 * 60 * 60 * 1000, httpOnly: true });

    res.json({ message: "User registered successfully", token, user: newUser });
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

// ===========Login User ===================
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: "All fields are required" });

    const existingUser = await userModel.findOne({ email });
    if (!existingUser)
      return res.status(400).json({ message: "User not found" });

    const findUser = await userModel.findOne({ email });
    if (!findUser)
      return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, findUser.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });
  
    const token = await generateToken(findUser._id);

    findUser.password = undefined;
    res.cookie("token", token, { maxAge: 24 * 60 * 60 * 1000, httpOnly: true });

    res.json({ message: "User login successfully", token, user: findUser });
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

// ==============Get user by Id =============
export const getUserById = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await userModel.findById(userId);
    if (!user)
      return res.status(400).json({ message: "User not found" });

    user.password = undefined;
    res.json({ user });
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

// ============= Controller for getting all user resume ====================

export const getAllUserResume = async (req, res) => { 
    try {
        const userId = req.userId;

        // return user resume
        const resume = await resumeModel.find({userId:userId})
        res.status(200).json({resume})

    } catch (error) {
        return res.status(404).json({message:error.message})
    }
}