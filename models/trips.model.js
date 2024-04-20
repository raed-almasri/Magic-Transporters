import dotenv from "dotenv";
dotenv.config({ path: `../.env` });
import { sequelize } from "../utils/connect.js";
import { DataTypes, Model } from "sequelize";
import { enumState } from "../utils/enums.js";

class Trips extends Model {}

Trips.init(
	{
		name: {
			type: DataTypes.STRING(50),
			allowNull: false,
			set(value) {
				this.setDataValue("name", value.trim());
			},
		},
		quest_state: {
			type: DataTypes.ENUM,
			values: Object.values(enumState),
			allowNull: false,
		},
		magic_mover_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
	},
	{
		freezeTableName: true,
		sequelize,
		tableName: "trips",
		timestamps: true,
		updatedAt: false,
		paranoid: false,
	}
);
export default Trips;
