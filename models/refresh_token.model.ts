import { sequelize } from "../utils/connect.js";
import { DataTypes, Model } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

class RefreshToken extends Model {}

RefreshToken.init(
    {
        user_id: { type: DataTypes.INTEGER, allowNull: false },
        refresh_token: {
            allowNull: true,
            type: DataTypes.STRING(1000),
        },
        deviceId: { type: DataTypes.STRING, allowNull: false },
        ip: { type: DataTypes.STRING, allowNull: false },
    },
    {
        sequelize,
        tableName: "refresh_token",
        freezeTableName: true,
        timestamps: true,
        paranoid: false,
        updatedAt: false,
    }
);
export default RefreshToken;
