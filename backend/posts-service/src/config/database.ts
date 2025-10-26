import { DataSource } from 'typeorm';
import { Post } from '../entities/Post';
import { Like } from '../entities/Like';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'social_network',
  synchronize: true,
  logging: false,
  entities: [Post, Like],
  subscribers: [],
  migrations: [],
});
