import Role from "../models/Role.js";
import User from "../models/User.js";
import Stylist from "../models/Stylist.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { CreateError } from "../utils/error.js";
import { CreateSuccess } from "../utils/success.js";

export const registerUser = async (req, res, next) => {
  try {
    // 1. Fetch User Role
    const userRole = await getRoleByName('User'); // Replace with your getRoleByName function

    // 2. Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    // 3. Create New User Object
    const newUser = new User({
      // fullName: req.body.fullName, // Include if you have a fullName field
      username: req.body.username,
      email: req.body.email,
      password: hashPassword,
      profileImage: req.body.profileImage,
      bodyweight: req.body.bodyweight,
      height: req.body.height,
      isAdmin: req.body.isAdmin,
      roles: [userRole._id], // Assign role ID
    });

    // 4. Save New User to Database
    await newUser.save();

    // 5. Send Success Response
    return next(CreateSuccess(200, 'User Registered Successfully!'));
  } catch (error) {
    console.error('Error during user registration:', error); // Log the error
    if (error.name === 'ValidationError') {
      return next(CreateError(400, error.message));
    }
    return next(CreateError(500, 'Internal server error'));
  }
};


// export const registerStylist = async (req, res, next) => {
//   const stylistRole = await Role.find({ role: "Stylist" });
//   const salt = await bcrypt.genSalt(10);
//   const hashPassword = await bcrypt.hash(req.body.password, salt);
//   const newStylist = new Stylist({
//     fullName: req.body.fullName,
//     username: req.body.username,
//     email: req.body.email,
//     password: hashPassword,
//     profileImage: req.body.profileImage,
//     isAdmin: req.body.isAdmin,
//     roles: stylistRole,
//   });
//   await newStylist.save();
//   return next(CreateSuccess(200, "Stylist Registered Successfully!"));
// };

export const registerStylist = async (req, res, next) => {
  try {
    // 1. Fetch Stylist Role
    const stylistRole = await getRoleByName('Stylist'); 

    // 2. Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    // 3. Create New Stylist Object
    const newStylist = new Stylist({
      // fullName: req.body.fullName, // Include if you have a fullName field
      username: req.body.username,
      email: req.body.email,
      password: hashPassword,
      profileImage: req.body.profileImage,
      isAdmin: req.body.isAdmin,
      roles: [stylistRole._id], // Assign role ID
    });

    // 4. Save New Stylist to Database
    await newStylist.save();

    // 5. Send Success Response
    return next(CreateSuccess(200, 'Stylist Registered Successfully!'));
  } catch (error) {
    console.error('Error during user registration:', error); // Log the error
    if (error.name === 'ValidationError') {
      return next(CreateError(400, error.message));
    }
    return next(CreateError(500, 'Internal server error'));
  }

};

// Example getRoleByName function
async function getRoleByName(roleName) {
  try {
    const role = await Role.findOne({ role: roleName });
    if (!role) {
      throw new Error(`Role '${roleName}' not found`);
    }
    return role;
  } catch (error) {
    throw error; // Re-throw error to be handled by the calling function
  }
}

export const registerAdmin = async (req, res, next) => {
  const role = await Role.find({});
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);
  const newStylist = new Stylist({
    fullName: req.body.fullName,
    username: req.body.username,
    email: req.body.email,
    password: hashPassword,
    profileImage: req.body.profileImage,
    isAdmin: true,
    roles: role,
  });
  await newStylist.save();
  return next(CreateSuccess(200, "Admin Registered Successfully!"));
};

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email }).populate(
      "roles",
      "role"
    );

    const { roles } = user;
    if (!user) {
      return next(CreateError(404, "User not found"));
    }
    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect) {
      return next(CreateError(400, "Password is Incorrect"));
    }
    const token = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
        roles: roles,
      },
      process.env.JWT_SECRET
    );
    res.cookie("access_token", token, { httpOnly: true }).status(200).json({
      status: 200,
      message: "Login Successfully!",
      data: user,
    });
  } catch (error) {
    return next(CreateError(500, "Something Went wrong"));
  }
};
