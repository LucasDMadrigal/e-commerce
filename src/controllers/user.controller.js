/**
 * const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.registerUser = async (req, res) => {
  // Lógica para registrar usuario
};

exports.loginUser = async (req, res) => {
  // Lógica para iniciar sesión
};

 */

import {User} from "../models/users.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  const encryptedPassword = await bcrypt.hash(password, 10);
  const user = new User({ name, email, password: encryptedPassword });
  await user.save();
  res.json({ message: "User registered successfully" });
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.status(401).json({ message: "Invalid email or password" });
  }
  const token = jwt.sign({ userId: user._id }, "secretkey");
  res.json({ token });
};

export const getUsers = async (req, res) => {
  const users = await User.find();
  // res.json({ message: "User created successfully", users });
  res.send({ result:"success", payload: users });
};

export const getUserById = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  res.json(user);
};

export const createUser = async (req, res) => {
  const { first_name, last_name, email} = req.body;
  // const encryptedPassword = await bcrypt.hash(password, 10);
  const user = new User({ first_name, last_name, email });
  await user.save();
  res.json({ message: "User created successfully" });
};

export default { registerUser, loginUser, getUsers, getUserById, createUser };