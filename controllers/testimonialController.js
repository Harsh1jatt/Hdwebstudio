import Testimonial from '../models/Testimonial';

export async function getAllTestimonials() {
  return await Testimonial.find();
}
export async function getTestimonialById(id) {
  return await Testimonial.findById(id);
}
export async function createTestimonial(data) {
  return await Testimonial.create(data);
}
export async function updateTestimonial(id, data) {
  return await Testimonial.findByIdAndUpdate(id, data, { new: true });
}
export async function deleteTestimonial(id) {
  return await Testimonial.findByIdAndDelete(id);
}
