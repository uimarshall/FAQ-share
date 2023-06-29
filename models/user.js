const { Schema, model, models } = require('mongoose');

const UserSchema = new Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    match: [
      /^(?=.{3,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
      'Please fill a valid username, it should contain 3-20 alphanumeric characters and be unique',
    ],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: [true, 'Email already exists'],
  },
  image: {
    type: String,
  },
});

const User = models.User || model('User', UserSchema);
export default User;
