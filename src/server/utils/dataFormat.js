/**
 * Converts an object to FormData.
 *
 * @param {Object} obj - The object to convert.
 * @returns {FormData} - The converted FormData object.
 */
export const objectToFormData = (obj) => {
  const formData = new FormData();
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      formData.append(key, obj[key]);
    }
  }
  return formData;
};
