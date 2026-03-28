import { env } from '../config/env.js';

export function errorHandler(err, req, res, next) {
  const status = err.status || err.statusCode || 500;
  const payload = {
    error: err.message || 'Internal Server Error',
  };
  if (err.details) payload.details = err.details;
  if (env.nodeEnv === 'development' && err.stack) payload.stack = err.stack;
  res.status(status).json(payload);
}

export function notFoundHandler(req, res) {
  res.status(404).json({ error: 'Not found', path: req.originalUrl });
}
