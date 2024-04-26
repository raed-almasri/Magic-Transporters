import app from "./app.js";
import { sequelize } from "./utils/connect.js";

app.listen(process.env.PORT, async () => {
    //await createRelations();

    console.log(
        `Listening at http://${process.env.DOMAIN}:${process.env.PORT} ✅`
    );
});

// ! Create Relation between tables
// let createRelations = async () => {
//     let all = await import("./models/index.js");
//     sequelize
//         .sync({ force: true })
//         .then(async () => {
//             let defaultData = await import("./utils/default_data.js");
//             await defaultData.default().then((_) => {
//                 console.log(
//                     "successfully created relationships with tables ✅✅"
//                 );
//             });
//         })
//         .catch((err) => {
//             console.log(err);
//         });
// };
