import express from "express";
import User from "../models/usersModel.js";
import cors from "cors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import auth from "../middleware/auth.js";

const router = express.Router();
router.use(cors());

//POST: /users/register
router.post("/register", async (req, res) => {
  try {
    const {
      email,
      password,
      passwordCheck,
      displayName,
      firstName,
      lastName,
      birthDate,
    } = req.body;

    //validate
    if (!email || !password || !passwordCheck) {
      return res.status(400).json({ msg: "Not all fields have been entered" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ msg: "Password must be at least 6 characters" });
    }
    if (password != passwordCheck) {
      return res.status(400).json({ msg: "Passwords do not match" });
    }
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res
        .status(400)
        .json({ msg: "An account with this email already exists" });
    }
    if (!displayName) displayName = email;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      email,
      password: passwordHash,
      displayName,
      firstName,
      lastName,
      birthDate,
    });
    const savedUser = await newUser.save();
    res.json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//POST: user/login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    //validate
    if (!email || !password) {
      return res.status(400).json({ msg: "Not all fields have been entered" });
    }

    const user = await User.findOne({ email: email });
    if (!user) {
      return res
        .status(400)
        .json({ msg: "Invalid credentials" });
    }

    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.json({
      token,
      user: {
        id: user._id,
        displayName: user.displayName,
        email: user.email,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//DELETE: users/delete
router.delete("/delete", auth, async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.user);
    res.json(deletedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//POST: users/tokenisvalid
router.post("/tokenisvalid", async (req, res) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) {
      return res.json(false);
    }
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) {
      return res.json(false);
    }
    const user = await User.findById(verified.id)
    if (!user){
        return res.json(false)
    }
    return res.json(true)
    
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//POST: users/search
router.post("/search", async (req, res) => {
  try {
    const search = req.body.search;
    const user = await User.find({displayName: {$regex: search, $options: 'i'}}).limit(5);
    if (!user){
        return res.json(false)
    }
    return res.json(user)
    
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//GET: /users
router.get("/", auth, async (req, res) => {
  const user = await User.findById(req.user)
  res.json({
    displayName: user.displayName,
    id: user._id,
    firstName: user.firstName,
    lastName: user.lastName
  })
})

//GET: /users/userId
router.get("/:userId", (req, res) => {
  let userId = req.params.userId;
  User.findById(userId)
    .then((results) => {
      res.send(results);
    })
    .catch((err) => {
      console.log(err);
    });
});

export default router;
