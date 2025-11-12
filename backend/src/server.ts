import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import { config } from '@/config';
import { errorMiddleware } from '@/middleware/errorMiddleware';
import { notFoundMiddleware } from '@/middleware/notFoundMiddleware';
import apiRoutes from '@/routes';

const app: Application = express();

/**
 * @summary Security middleware configuration
 */
app.use(helmet());
app.use(cors(config.api.cors));

/**
 * @summary Request processing middleware
 */
app.use(compression());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

/**
 * @summary Logging middleware
 */
if (config.server.nodeEnv === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

/**
 * @summary Health check endpoint
 */
app.get('/health', (req: Request, res: Response) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    environment: config.server.nodeEnv,
  });
});

/**
 * @summary API Routes with versioning
 */
app.use('/api', apiRoutes);

/**
 * @summary 404 handler
 */
app.use(notFoundMiddleware);

/**
 * @summary Error handling middleware
 */
app.use(errorMiddleware);

/**
 * @summary Graceful shutdown handler
 */
process.on('SIGTERM', () => {
  console.log('SIGTERM received, closing server gracefully');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

/**
 * @summary Server startup
 */
const server = app.listen(config.api.port, () => {
  console.log(`Server running on port ${config.api.port} in ${config.server.nodeEnv} mode`);
  console.log(`API available at http://localhost:${config.api.port}/api/${config.api.version}`);
});

export default server;
