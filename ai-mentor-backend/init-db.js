const mysql = require('mysql2/promise');
require('dotenv').config();

async function initializeDatabase() {
  try {
    // Create connection without database selected
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'karthik'
    });

    console.log('Connected to MySQL server');

    // Create database if it doesn't exist
    await connection.query(`CREATE DATABASE IF NOT EXISTS ai_mentor_db`);
    console.log(`Database ai_mentor_db created or already exists`);

    // Use the database
    await connection.query(`USE ai_mentor_db`);

    // Create users table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS Users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);
    console.log('Users table created or already exists');

    await connection.end();
    console.log('Database initialization completed');
    process.exit(0);
  } catch (error) {
    console.error('Database initialization error:', error);
    process.exit(1);
  }
}

initializeDatabase(); 