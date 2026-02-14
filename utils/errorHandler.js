export function handleError(error) {
  return { success: false, data: null, message: error.message || 'Server Error' };
}
