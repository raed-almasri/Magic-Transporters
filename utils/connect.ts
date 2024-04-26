import mysql2 from "mysql2";
import { Sequelize } from "sequelize";

let DB_PORT: number = parseInt(process.env.DB_PORT || "3306", 10);
let DB_USER: string = process.env.DB_USER || "root";
let DB_NAME: string = process.env.DB_NAME || "magice_tansporters";
let DB_PASSWORD: string = process.env.DB_PASSWORD || "magice_tansporters";
let DB_HOST: string = process.env.DB_HOST || "magice_tansporters";

export let sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    dialect: "mysql",
    dialectModule: mysql2,
    host: DB_HOST,
    port: DB_PORT,
    define: {
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
    },
    logging: false,
});
