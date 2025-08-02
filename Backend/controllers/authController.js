import User from "../models/User.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const isExist = await User.findOne({ email });
        if (isExist) {
            return res.status(400).json({ msg: "User already exist" })
        }
        const isExist2 = await User.findOne({ username });
        if (isExist2) {
            return res.status(400).json({ msg: "username already exist" })
        }

        const hashedpassword = await bcrypt.hash(password, 10);
        console.log("A")
        const newUser = new User({
            username,
            email,
            password: hashedpassword
        })
        console.log("B")
        const savedUser = await newUser.save();
        console.log("C", savedUser)
        const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        console.log("D")

        res.status(201).json({ msg: 'User registered successfully', token: token })
    } catch (err) {
        console.error("Save Error:", err);
        res.status(500).json({ msg: 'Server error', error: err.message })
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({
            msg: "Login successful",
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });
    } catch (err) {
        res.status(500).json({ msg: 'Server error', error: err.message })
    }
}

export {
    register,
    login,
}