import dotenv from "dotenv";

dotenv.config({ path: `./.env` });
import bcryptJs from "bcryptjs";

export let bcrypt = (password: string) => {
    const salt = bcryptJs.genSaltSync(12);
    return bcryptJs.hashSync(password, salt);
};

export let compare = async (password: string, validPassword: string) =>
    await bcryptJs.compare(password, validPassword);
