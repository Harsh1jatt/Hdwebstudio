import Team from '../models/Team';

export async function getAllTeam() {
  return await Team.find();
}
export async function getTeamById(id) {
  return await Team.findById(id);
}
export async function createTeam(data) {
  return await Team.create(data);
}
export async function updateTeam(id, data) {
  return await Team.findByIdAndUpdate(id, data, { new: true });
}
export async function deleteTeam(id) {
  return await Team.findByIdAndDelete(id);
}
