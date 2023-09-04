import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
	name: String,
	email: String,
	password: String,
	lastName: { type: String, default: 'lastName' },
	location: { type: String, default: 'location' },
	role: { type: String, enum: ['user', 'admin'], default: 'user' },
	avatar: String,
	avatarPublicId: String,
});

//used to remove the password when pulling in the user
UserSchema.methods.toJson = function () {
	let obj = this.toObject();
	delete obj.password;
	return obj;
};

export default mongoose.model('User', UserSchema);
