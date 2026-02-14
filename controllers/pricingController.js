import Pricing from '../models/Pricing';

export async function getAllPricing() {
  return await Pricing.find();
}
export async function getPricingById(id) {
  return await Pricing.findById(id);
}
export async function createPricing(data) {
  return await Pricing.create(data);
}
export async function updatePricing(id, data) {
  return await Pricing.findByIdAndUpdate(id, data, { new: true });
}
export async function deletePricing(id) {
  return await Pricing.findByIdAndDelete(id);
}
