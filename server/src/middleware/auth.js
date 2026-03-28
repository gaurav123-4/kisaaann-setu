import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import { User } from '../models/User.js';
import { HttpError } from '../utils/HttpError.js';

export function requireAuth(req, res, next) {
  const header = req.headers.authorization;
  const token = header?.startsWith('Bearer ') ? header.slice(7) : null;
  if (!token) {
    next(new HttpError(401, 'Authentication required'));
    return;
  }
  try {
    const decoded = jwt.verify(token, env.jwtSecret);
    req.userId = decoded.sub;
    req.userRole = decoded.role;
    next();
  } catch {
    next(new HttpError(401, 'Invalid or expired token'));
  }
}

export async function attachUser(req, res, next) {
  if (!req.userId) {
    next();
    return;
  }
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      next(new HttpError(401, 'User not found'));
      return;
    }
    req.user = user;
    next();
  } catch (e) {
    next(e);
  }
}

export function requireAdmin(req, res, next) {
  if (req.userRole !== 'admin') {
    next(new HttpError(403, 'Admin only'));
    return;
  }
  next();
}
