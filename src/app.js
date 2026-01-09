import express from 'express';
import healthRoutes from './routes/health.routes.js';
import authRoutes from './modules/auth/auth.routes.js';
import notesRoutes from './modules/notes/notes.routes.js'

const app = express();

app.use(express.json());

app.use('/health', healthRoutes);
app.use("/auth", authRoutes);
app.use("/notes", notesRoutes)

export default app;