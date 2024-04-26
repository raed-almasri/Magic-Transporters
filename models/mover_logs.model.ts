import dotenv from "dotenv";
dotenv.config({ path: `../.env` });
import { sequelize } from "../utils/connect.js";
import { DataTypes, Model } from "sequelize";
import { enumState } from "../utils/enums.js";

class MoverLogs extends Model {}

MoverLogs.init(
    {
        state: {
            type: DataTypes.ENUM,
            values: Object.values(enumState),
            allowNull: false,
        },
        trip_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        freezeTableName: true,
        sequelize,
        tableName: "mover_logs",
        timestamps: true,
        updatedAt: false,
        paranoid: false,
    }
);
export default MoverLogs;
