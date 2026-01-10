import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import healthRoutes from './routes/health.routes.js';
import authRoutes from './modules/auth/auth.routes.js';
import notesRoutes from './modules/notes/notes.routes.js';
import { errorHandler } from './middleware/error.middleware.js';
import { globalLimiter, authLimiter } from './middleware/rateLimit.middleware.js';

const app = express();

app.use(helmet());
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json({ limit: "10kb" }));

app.use(globalLimiter)

app.use('/health', healthRoutes);
app.use("/auth", authLimiter, authRoutes);
app.use("/notes", notesRoutes);
app.use(errorHandler);

export default app;