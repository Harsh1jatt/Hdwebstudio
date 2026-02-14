import FAQ from '../models/FAQ';

export async function getAllFAQs() {
  return await FAQ.find();
}
export async function getFAQById(id) {
  return await FAQ.findById(id);
}
export async function createFAQ(data) {
  return await FAQ.create(data);
}
export async function updateFAQ(id, data) {
  return await FAQ.findByIdAndUpdate(id, data, { new: true });
}
export async function deleteFAQ(id) {
  return await FAQ.findByIdAndDelete(id);
}
