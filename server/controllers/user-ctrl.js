import User from "../models/user-model.js";
import bcrypt from "bcryptjs";
import sendEmail from "../utils/send-email.js";
import crypto from "crypto";
import cloudinary from "cloudinary";

// SIGNUP USER
export const signupUser = async (req, res) => {
  try {
    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: "avatars",
    });
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).send("please fill all the fields");
    }
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      return res.status(400).send("user already exist");
    }

    const hashPass = await bcrypt.hash(password, 12);
    const user = await User.create({
      name: name,
      email: email,
      password: hashPass,
      avatar: {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      },
    });

    if (!user) {
      return res.status(400).send("user signup failed!");
    }

    // GENERATE TOKEN
    const accessToken = user.genToken();

    // STORE TOKEN IN COOKIE
    res.cookie("jwtoken", accessToken, {
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    });
    res.status(200).send({ user, accessToken });
  } catch (error) {
    console.log(error);
  }
};

// LOGIN USER
export const loginUser = async (req, res) => {
  try {
    const email = req.body.email;
    const inputPassword = req.body.password;

    if (!email || !inputPassword) {
      return res.status(400).send("please fill all the fields");
    }

    let userExist = await User.findOne({ email: email });
    if (!userExist) {
      return res.status(400).send("invalid credentials!!");
    }
    const userPassword = await userExist.comparePassword(inputPassword);

    if (!userPassword) {
      return res.status(400).send("invalid credentials!");
    }
    // GENERATE TOKEN
    const accessToken = userExist.genToken();

    // STORE TOKEN IN COOKIE
    res.cookie("jwtoken", accessToken, {
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    });

    //   HIDING PASSWORD
    const { password, ...userlog } = userExist._doc;
    res.status(200).send({ ...userlog, accessToken });
  } catch (error) {
    console.log(error);
  }
};

// LOGOUT USER
export const logout = async (req, res) => {
  res.clearCookie("jwtoken");
  res.status(200).send("user logged out!");
};

// FORGOT PASSWORD
export const forgotPass = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return res.status(400).send("user not found");
  }
  // get reset password token
  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  // for deploying
  // const resetPassUrl = `${req.protocol}://${req.get(
  //   "host"
  // )}/reset-pass/${resetToken}`;

  // if you change your url then you have to some changes in mail-msg that can help code to run better
  // for testing
  const resetPassUrl = `${process.env.CLIENT_URL}/reset-pass/${resetToken}`;

  const mailMsg = `<h1> Your reset password token is :- </h1> 
     <p> ${resetPassUrl} </p>
   <p> If you have not requested this email then please ignore it! </p>`;
  try {
    await sendEmail({
      email: user.email,
      subject: `Password recovery mail from ecommerce app`,
      html: mailMsg,
    });
    res.status(200).send(`email send to ${user.email} successfully!`);
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });

    console.log(error);
  }
};

// RESET PASSWORD
export const resetPass = async (req, res) => {
  try {
    // creating token hash
    const resetToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    const user = await User.findOne({
      resetPasswordToken: resetToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res
        .status(400)
        .send("reset password token is invalid or has been expired!");
    }
    if (req.body.password !== req.body.confirmPassword) {
      return res.status(400).send("password does not match!");
    }

    const hashPass = await bcrypt.hash(req.body.password, 12);

    user.password = hashPass;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.status(200).send(user);
  } catch (error) {
    console.log(error);
  }
};

// DELETE YOUR PROFILE
export const deleteProfile = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.user._id);
    if (!deletedUser) {
      return res.status(400).send("user is not deleted!");
    }
    res.status(200).send("user is deleted!");
  } catch (error) {
    console.log(error);
  }
};

// GET YOUR DETAILS
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(400).send("user is not found!");
    }
    res.status(200).send(user);
  } catch (error) {
    console.log(error);
  }
};

// UPDATE YOUR PASSWORD
export const updatePass = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

    if (!isPasswordMatched) {
      return res.status(400).send("Old password is incorrect");
    }

    if (req.body.newPassword.length <= 3) {
      return res
        .status(400)
        .send("password should be greater than 3 charactes!");
    }
    if (req.body.newPassword !== req.body.confirmPassword) {
      return res.status(400).send("password does not match");
    }
    const hashPass = await bcrypt.hash(req.body.newPassword, 12);

    user.password = hashPass;

    await user.save();

    res.status(200).send(user);
  } catch (error) {
    console.log(error);
  }
};

// UPDATE YOUR PROFILE
export const updateProfile = async (req, res) => {
  try {
    // let { name, email, avatar } = req.body;
    const newUserData = {
      name: req.body.name,
      email: req.body.email,
    };
    if (req.body.avatar) {
      const user = await User.findById(req.user._id);

      const imageId = user.avatar.public_id;

      await cloudinary.v2.uploader.destroy(imageId);

      // const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
      //   folder: "avatars",
      //   width: 150,
      //   // crop: "scale",
      // });

      // avatar = {
      //   public_id: myCloud.public_id,
      //   url: myCloud.secure_url,
      // };
      // newUserData.avatar = {
      //   public_id: myCloud.public_id,
      //   url: myCloud.secure_url,
      // };
    }

    const user = await User.findByIdAndUpdate(
      req.user._id,
      // {
      //   name,
      //   email,
      //   avatar,
      // },
      newUserData,
      {
        new: true,
      }
    );
    if (!user) {
      return res.status(400).send("user profile is not updated!");
    }
    res.status(200).send(user);
  } catch (error) {
    console.log(error);
  }
};

// GET A USER (ADMIN)
export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(400).send("user is not found!");
    }
    res.status(200).send(user);
  } catch (error) {
    console.log(error);
  }
};

// GET ALL USERS (ADMIN)
export const getAllUsers = async (req, res) => {
  try {
    const query = req.query.new;
    const users = query
      ? await User.find().sort({ _id: -1 }).limit(5)
      : await User.find().select("-password");
    if (!users) {
      return res.status(400).send("users are not found!");
    }
    res.status(200).send(users);
  } catch (error) {
    console.log(error);
  }
};

// UPDATE USER ROLE (ADMIN)
export const updateUserRole = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        role: req.body.role,
      },
      {
        new: true,
      }
    );
    if (!user) {
      return res.status(400).send("user role is not updated!");
    }

    res.status(200).send(user);
  } catch (error) {
    console.log(error);
  }
};

// DELETE USER PROFILE (ADMIN)
export const deleteUserProfile = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(400).send("user is not deleted!");
    }
    const userPic = user.avatar.public_id;
    await cloudinary.v2.uploader.destroy(userPic);
    res.status(200).send("user is deleted!");
  } catch (error) {
    console.log(error);
  }
};
