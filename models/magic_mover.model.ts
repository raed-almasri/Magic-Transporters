import dotenv from "dotenv";
dotenv.config({ path: `../.env` });
import { sequelize } from "../utils/connect.js";
import { DataTypes, Model } from "sequelize";
import { enumState } from "../utils/enums.js";

class MagicMover extends Model {}

MagicMover.init(
    {
        weight: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        energy: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        freezeTableName: true,
        sequelize,
        tableName: "magic_movers",
        timestamps: true,
        paranoid: false,
    }
);
export default MagicMover;
