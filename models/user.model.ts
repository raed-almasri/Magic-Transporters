import dotenv from "dotenv";
dotenv.config({ path: `../.env` });
import { sequelize } from "../utils/connect.js";
import { DataTypes, Model } from "sequelize";
import { bcrypt } from "../utils/bcrypt.js";
import { enumRoles } from "../utils/enums.js";

class Users extends Model {}

Users.init(
    {
        name: {
            type: DataTypes.STRING(50),
            allowNull: false,
            set(value: string) {
                this.setDataValue("name", value.trim());
            },
        },

        email: {
            type: DataTypes.STRING(200),
            allowNull: false,
            unique: true,

            set(value: string) {
                this.setDataValue("email", value.trim());
            },
        },
        password: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        verification_email: { type: DataTypes.STRING, allowNull: false },
        picture: { type: DataTypes.STRING, allowNull: true },
        role: {
            type: DataTypes.ENUM,
            values: Object.values(enumRoles),
            allowNull: false,
        },
    },

    {
        sequelize,
        tableName: "users",
        timestamps: true,
        indexes: [
            {
                unique: true,
                fields: ["email"],
                name: "email_index",
                using: "BTREE",
            },
        ],
        //! Triggers
        hooks: {
            beforeUpdate: (user: any) => {
                if (user.password) {
                    user.password = bcrypt(user.password);
                }
            },
            beforeCreate: (user) => {
                user.password = bcrypt(user.password);
            },
        },
    }
);

export default Users;
