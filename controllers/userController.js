import User from '../models/User';

export async function getAllUsers() {
  return await User.find();
}
export async function getUserById(id) {
  return await User.findById(id);
}
export async function createUser(data) {
  return await User.create(data);
}
export async function updateUser(id, data) {
  return await User.findByIdAndUpdate(id, data, { new: true });
}
export async function deleteUser(id) {
  return await User.findByIdAndDelete(id);
}
