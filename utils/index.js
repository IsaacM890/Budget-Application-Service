/** @format */

const getRequireText = (fieldname) => {
  return `${fieldname} is required`;
};

const getValidText = (fieldname) => {
  return `Please include a valid ${fieldname}`;
};

const getLengthText = (fieldname, num) => {
  return `Please enter a ${fieldname} with ${num} or more characters`;
};

module.exports = {
  getRequireText,
  getValidText,
  getLengthText,
};
