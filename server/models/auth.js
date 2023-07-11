import mongoose from "mongoose";
import bcrypt from "bcryptjs";


const userSchema = mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    about: {type: String },
    tags: {type: [String] },
    joinedOn: {type: Date, default: Date.now }
})

userSchema.pre("save", async function (next) {
	if (!this.isModified("password")) {
		return next();
	}

	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);

	this.passwordConfirm = undefined;
	next();
});

userSchema.methods.comparePassword = async function (givenPassword) {
	return await bcrypt.compare(givenPassword, this.password);
};

export default mongoose.model("User", userSchema)