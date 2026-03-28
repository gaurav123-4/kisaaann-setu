import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import { User } from '../models/User.js';
import { FarmerProfile } from '../models/FarmerProfile.js';
import { HttpError } from '../utils/HttpError.js';
import { asyncHandler } from '../utils/asyncHandler.js';

function signToken(user) {
  return jwt.sign(
    { sub: user._id.toString(), role: user.role },
    env.jwtSecret,
    { expiresIn: env.jwtExpiresIn }
  );
}

export const register = asyncHandler(async (req, res) => {
  const { email, password, name, phone } = req.body;
  const existing = await User.findOne({ email });
  if (existing) {
    throw new HttpError(409, 'Email already registered');
  }
  const passwordHash = await bcrypt.hash(password, 10);
  const user = await User.create({ email, passwordHash, name, phone });
  await FarmerProfile.create({ userId: user._id });
  const token = signToken(user);
  res.status(201).json({ token, user: user.toJSON() });
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
    throw new HttpError(401, 'Invalid email or password');
  }
  const token = signToken(user);
  res.json({ token, user: user.toJSON() });
});

export const me = asyncHandler(async (req, res) => {
  const user = await User.findById(req.userId);
  if (!user) throw new HttpError(404, 'User not found');
  res.json({ user: user.toJSON() });
});
