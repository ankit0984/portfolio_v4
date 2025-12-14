import mongoose from "mongoose";

const userModel = new mongoose.Schema({
	username: {
		type: String,
		required: [true, "provide username"],
		unique: true,
	},
	email: {
		type: String,
		required: [true, "provide username"],
		unique: true,
	},
	full_name: {
		type: String,
		required: [true, "provide username"],
	},
	password: {
		type: String,
		required: [true],
	},
	isverified: {
		type: Boolean,
		default: false,
	},
	isAdmin: {
		type: Boolean,
		default: false,
	},
    // two factor fields
    twoFactorEnabled: {
        type: Boolean,
        default: false,
    },
    twoFactorSecret: {
        type: String, // base32 secret for TOTP
    },
	forgotpasswordtoken: String,
	forgotpasswordtokenexpiry: Date,
	verifytoken: String,
	verifytokenexpiry: Date,
});

const UserSchema =
	mongoose.models.authentications ||
	mongoose.model("authentications", userModel);

export default UserSchema;
