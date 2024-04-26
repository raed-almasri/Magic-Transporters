import dotenv from "dotenv";
dotenv.config({ path: `../.env` });
import { sequelize } from "../utils/connect.js";
import { DataTypes, Model } from "sequelize";

class MagicItems extends Model {}

MagicItems.init(
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            set(value: string) {
                this.setDataValue("name", value.trim());
            },
        },
        weight: {
            type: DataTypes.INTEGER,
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
        tableName: "magic_items",
        timestamps: true,
        paranoid: false,
    }
);
export default MagicItems;
