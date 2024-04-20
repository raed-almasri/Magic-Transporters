import MagicItems from "./magic_item.model.js";
import MagicMover from "./magic_mover.model.js";
import MoverLogs from "./mover_logs.model.js";
import RefreshToken from "./refresh_token.model.js";
import Trips from "./trips.model.js";
import Users from "./user.model.js";

Users.hasMany(MagicMover, {
	constraints: true,
	onDelete: "CASCADE",
	onUpdate: "CASCADE",
	hooks: true,
	as: "magic_movers",
	foreignKey: "user_id",
});
MagicMover.belongsTo(Users, { foreignKey: "user_id", as: "profile_info" });

Users.hasMany(RefreshToken, {
	constraints: true,
	onDelete: "CASCADE",
	onUpdate: "CASCADE",
	hooks: true,
	as: "devices",
	foreignKey: "user_id",
});
RefreshToken.belongsTo(Users, { foreignKey: "user_id", as: "user_info" });

MagicMover.hasMany(Trips, {
	constraints: true,
	onDelete: "CASCADE",
	onUpdate: "CASCADE",
	hooks: true,
	as: "every_trips",
	foreignKey: "magic_mover_id",
});
Trips.belongsTo(MagicMover, {
	foreignKey: "magic_mover_id",
	as: "magic_mover_info",
});

Trips.hasMany(MagicItems, {
	constraints: true,
	onDelete: "CASCADE",
	onUpdate: "CASCADE",
	hooks: true,
	as: "magic_items_info",
	foreignKey: "trip_id",
});
MagicItems.belongsTo(Trips, {
	foreignKey: "trip_id",
	as: "trip_info",
});

Trips.hasMany(MoverLogs, {
	constraints: true,
	onDelete: "CASCADE",
	onUpdate: "CASCADE",
	hooks: true,
	as: "mover_logs_info",
	foreignKey: "trip_id",
});
MoverLogs.belongsTo(Trips, {
	foreignKey: "trip_id",
	as: "trip_from_mover_info",
});

// -------------------------------------------------------------------

export { RefreshToken, Users, MoverLogs, Trips, MagicItems, MagicMover };
