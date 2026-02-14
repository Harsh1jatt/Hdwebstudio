import Service from '../models/Service';

export async function getAllServices() {
  return await Service.find();
}
export async function getServiceById(id) {
  return await Service.findById(id);
}
export async function createService(data) {
  return await Service.create(data);
}
export async function updateService(id, data) {
  return await Service.findByIdAndUpdate(id, data, { new: true });
}
export async function deleteService(id) {
  return await Service.findByIdAndDelete(id);
}
