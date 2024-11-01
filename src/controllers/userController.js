const { create } = require("../models/KoiFishBreed");
var userService = require("../services/userService");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const handleLogin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      errCode: 1,
      message: "Missing INPUT PARAMETER! Please check again!",
    });
  }

  try {
    const userData = await userService.handleUserLogin(email, password);

    if (userData.errCode !== 0) {
      return res.status(400).json(userData);
    }

    const accessToken = jwt.sign(
      { id: userData.user._id, role: userData.user.role },
      process.env.ACCESS_TOKEN_SECRET
    );

    userData.user.accessToken = accessToken;

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      path: "/",
      sameSite: "none",
      secure: true,
    });

    return res.status(200).json({
      errCode: userData.errCode,
      message: userData.errMessage,
      user: userData.user
    });
  } catch (error) {
    console.error("Error in handleLogin:", error);
    return res.status(500).json({
      errCode: 1,
      message: "Server error",
      error: error.message,
    });
  }
};


let handleRegister = async (req, res) => {
  let { email, password, gender, name, birth } = req.body;

  // Check if any required field is missing
  if (!email || !password || !gender || !name || !birth) {
    return res.status(400).json({
      errCode: 1,
      message: "Missing INPUT PARAMETER! Please check again!",
    });
  }

  try {
    let message = await userService.handleUserRegister(
      email,
      password,
      gender,
      name,
      birth
    );

    if (message.errCode !== 0) {
      return res.status(400).json(message);
    } else {
      return res.status(200).json(message);
    }
  } catch (error) {
    console.error("Error in handleRegister:", error);
    return res.status(500).json({
      errCode: 1,
      message: "Server error",
      error: error.message,
    });
  }
};

let handleForgotPassword = async (req, res) => {
  let email = req.body.email;
  if (!email) {
    return res.status(400).json({
      errCode: 1,
      message: "Missing INPUT PARAMETER! Please check again!",
    });
  }
  let message = await userService.forgotPassword(email);
  return res.status(200).json(message);
}

let getProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const userProfile = await userService.getUserProfile(userId);

    if (!userProfile) {
      return res.status(404).json({
        errCode: 404,
        message: 'User profile not found'
      });
    }

    return res.status(200).json({
      errCode: 0,
      message: 'OK',
      userProfile
    });
  } catch (error) {
    console.error('Error in getProfile:', error);
    return res.status(500).json({
      errCode: 500,
      message: 'Server error',
      error: error.message
    });
  }
};

let updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { firstName, lastName, email, phone } = req.body;

    const result = await userService.updateProfile(userId, firstName, lastName, email, phone);

    if (result.errCode !== 0) {
      return res.status(400).json(result);
    }

    return res.status(200).json(result);
  } catch (error) {
    console.error('Error in updateProfile:', error);
    return res.status(500).json({
      errCode: 500,
      message: 'Server error',
      error: error.message
    });
  }
};

let deleteAccount = async (req, res) => {
  try {
    const userId = req.user.id;

    const result = await userService.deleteAccount(userId);

    if (result.errCode !== 0) {
      return res.status(400).json(result);
    }

    return res.status(200).json(result);
  } catch (error) {
    console.error('Error in deleteAccount:', error);
    return res.status(500).json({
      errCode: 500,
      message: 'Server error',
      error: error.message
    });
  }
};

const calculateZodiac = async (req, res) => {
  try {
    const { birthDate } = req.body;

    if (!birthDate) {
      return res.status(400).json({
        errCode: 1,
        message: 'Invalid input parameters'
      });
    }

    const zodiac = await userService.getMyZodiac(birthDate);

    return res.status(200).json({
      errCode: 0,
      message: 'Zodiac calculated successfully',
      zodiac
    });
  } catch (error) {
    console.error('Error in calculateZodiac controller:', error);
    return res.status(500).json({ errCode: 1, message: 'Server error', error: error.message });
  }
}

const createConsultation = async (req, res) => {
  try {
    const userId = req.user.id;
    const { timeBooked, description } = req.body;

    if (!timeBooked || !description) {
      return res.status(400).json({
        errCode: 1,
        message: 'Invalid input parameters'
      });
    }

    const result = await userService.createConsultation(userId, timeBooked, description);

    return res.status(200).json(result);
  } catch (error) {
    console.error('Error in createConsultation controller:', error);
    return res.status(500).json({ errCode: 1, message: 'Server error', error: error.message });
  }
}

const buyPackage = async (req, res) => {
  try {
    const result = await userService.buyPackage(req);
    switch (result.errCode) {
      case 0:
        return res.status(200).json(result);
      case 1:
        return res.status(401).json(result); 
      case 2:
        return res.status(402).json(result); 
      case 3:
        return res.status(403).json(result); 
      default:
        return res.status(500).json({ errCode: 1, message: 'Unknown error' });
    }
  } catch (error) {
    console.error('Error in buyPackage:', error);
    return res.status(500).json({
      errCode: 500,
      message: 'Server error',
      error: error.message
    });
  }
};

const minusBalance = async (req, res) => {
  try {
    const id = req.user.id
    const {amount} = req.body
    const respone = await userService.minusBalance(id, amount)
    return res.status(200).json(respone);
  } catch (error) {
    console.error('Error in minusBalance:', error);
    return res.status(500).json({ errCode: 500, message: 'Server error', error: error.message
    });
  }
}


module.exports = {
  handleLogin: handleLogin,
  handleRegister: handleRegister,
  handleForgotPassword: handleForgotPassword,
  getProfile: getProfile,
  updateProfile: updateProfile,
  deleteAccount: deleteAccount,
  calculateZodiac: calculateZodiac,
  createConsultation,
  buyPackage,
  minusBalance
};
