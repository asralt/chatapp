import { generateToken } from '../lib/util.js';
import User from '../models/user.model.js';
import bcrypt from "bcryptjs";
import cloudinary from '../lib/cloudinary.js';

// import { pass } from 'three/tsl';
// import { generateMagicSquareNoise } from 'three/examples/jsm/Addons.js';
// import { CapsuleGeometry } from 'three/webgpu';


export const signup = async (req, res) => {
    const { fullName, email, password } = req.body;

    try {
        // Validate password length
        if (!password || password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters long" });
        }
        // check if the email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user
        const newUser = new User({
            fullName,
            email,
            password: hashedPassword,
        });

        // Save the new user
        await newUser.save();

        // Generate token and send response
        generateToken(newUser._id, res);
        res.status(201).json({
            _id: newUser._id,
            fullName: newUser.fullName,
            email: newUser.email,
            profilePic: newUser.profilePic,
        });

    } catch (error) {
        console.error("Error in signup controller:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Compare password
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Generate token and send response
        generateToken(user._id, res);
        res.status(200).json({
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            profilePic: user.profilePic,
        });

    } catch (error) {
        console.error("Error in login controller:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const logout = (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.error("Error in logout controller:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const updateProfile = async(req,res)=>{
    try{
        const  {profilePic} = req.body;
        const userId = req.user._id;
        

        if(!profilePic){
            return res.status(400) .json({message: ":Profile pic is needed"});
        }


         const uploadResponse = await cloudinary.uploader.upload(profilePic);
         const updatedUser = await User.findByIdAndUpdate(userId,{profilePic: uploadResponse.secure_url}, {new:true})
        
         res.status(200).json(updatedUser);
    }catch(error){
        console.log("error in updating the profile:" , error);
        res.status(500). json({message: "Internal server error"});
    }
};

export const checkAuth = async(req,res)=>{
    try{
        res.status(200).json(req.user);
    }catch(error){
        console.log("Error in checkAuth controller", error.message);
        res.status(500).json({message: "Internal Server Error"});
    }
}


