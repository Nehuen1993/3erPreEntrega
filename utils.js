import bcrypt from 'bcrypt';

const createHash = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(10));

export default     createHash

export function isValidatePassword(user, password) {
  return bcrypt.compareSync(password, user.password);
}
