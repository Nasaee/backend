import dotenv from 'dotenv';
dotenv.config();

const { PORT } = process.env as {
  [key: string]: string;
};

export { PORT };
