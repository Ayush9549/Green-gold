const User = require('../models/User');
const Otp = require('../models/Otp');
const nodemailer = require('nodemailer');

exports.checkEmail = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ success: false, message: "Email already exists" });
        }
        res.status(200).json({ success: true, message: "Email is available" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.sendOtp = async (req, res) => {
    try {
        const { email } = req.body;

        // Generate 6 digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        // Save to DB
        await Otp.create({ email, otp });

        // Send Email
        const transporter = nodemailer.createTransport({
            service: process.env.SMPT_SERVICE || 'gmail',
            auth: {
                user: process.env.SMPT_MAIL,
                pass: process.env.SMPT_PASSWORD,
            },
        });

        const mailOptions = {
            from: process.env.SMPT_MAIL,
            to: email,
            subject: "Green Gold - Email Verification Code",
            text: `Welcome to Green Gold!\n\nYour verification OTP is: ${otp}\n\nThis code expires in 5 minutes.`,
        };

        await transporter.sendMail(mailOptions);
        console.log(`OTP sent locally for debug (remove in prod): ${otp}`);

        res.status(200).json({ success: true, message: `OTP sent to ${email}` });
    } catch (error) {
        console.error("Send OTP Error:", error);
        res.status(500).json({ success: false, message: "Failed to send OTP Email. Please check server SMTP configuration." });
    }
};

exports.registerUser = async (req, res) => {
    try {
        const { name, email, password, otp } = req.body;

        // Verify OTP
        const otpRecord = await Otp.findOne({ email, otp });
        if (!otpRecord) {
            return res.status(400).json({ success: false, message: "Invalid or Expired OTP" });
        }

        // Create User
        const user = await User.create({
            name,
            email,
            password,
        });

        // Generate Token (Mock or Real)
        // const token = user.getJWTToken(); // If user model has this method.
        // For now, just return success.

        // Cleanup OTP
        await Otp.deleteMany({ email });

        res.status(201).json({
            success: true,
            user,
            token: "mock-token-" + user._id // Replace with real JWT if jwt is available
        });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.loginUser = async (req, res) => {
    // Basic Login
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Please Enter Email & Password" });
        }
        const user = await User.findOne({ email }).select("+password");
        if (!user) {
            return res.status(401).json({ success: false, message: "Invalid email or password" });
        }

        // Ideally verify password with bcrypt
        if (user.password !== password) {
            return res.status(401).json({ success: false, message: "Invalid email or password" });
        }

        res.status(200).json({
            success: true,
            user,
            token: "mock-token-" + user._id
        });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}
