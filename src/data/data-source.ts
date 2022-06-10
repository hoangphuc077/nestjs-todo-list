import { DataSource } from "typeorm";

const myDataSource = new DataSource({
    "name": "default",
    "type": "postgres",
    "host": "localhost",
    "port": 5445,
    "username": "todo",
    "password": "password123",
    "database": "todo",
    "synchronize": false,
    "logging": true,
    "entities": ["src/**/*.entity.ts", "dist/**/*.entity.js"], 
    "migrations": ["src/migration/**/*.ts", "dist/migration/**/*.js"], 
    "subscribers": ["src/subscriber/**/*.ts", "dist/subscriber/**/*.js"],
});


export default myDataSource;