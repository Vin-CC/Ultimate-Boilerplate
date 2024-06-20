import dotenv from 'dotenv';
import validateEnv from './env-config.js';

dotenv.config();
validateEnv();

/** @type {import('next').NextConfig} */
const nextConfig = {};

export default nextConfig;
