import Project from '../models/Project';

export async function getAllProjects() {
  return await Project.find();
}
export async function getProjectById(id) {
  return await Project.findById(id);
}
export async function createProject(data) {
  return await Project.create(data);
}
export async function updateProject(id, data) {
  return await Project.findByIdAndUpdate(id, data, { new: true });
}
export async function deleteProject(id) {
  return await Project.findByIdAndDelete(id);
}
