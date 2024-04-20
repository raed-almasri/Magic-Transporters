import {   Users } from "../models/index.js";
import { enumRoles } from "./enums.js";
 
export default async () => {
	 
	await Users.create({
		name: "Administrator",
		email: "admin@gmail.com",
		password: "Test@1234",
		role: enumRoles.admin, 
		verification_email:true
	});
	 
};
