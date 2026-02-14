import Post from '../models/Post';

export async function getAllPosts() {
  return await Post.find();
}
export async function getPostById(id) {
  return await Post.findById(id);
}
export async function createPost(data) {
  return await Post.create(data);
}
export async function updatePost(id, data) {
  return await Post.findByIdAndUpdate(id, data, { new: true });
}
export async function deletePost(id) {
  return await Post.findByIdAndDelete(id);
}
