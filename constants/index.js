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

const serverMsg = {
  success: {
    create: 'User Registred',
    update: 'User Updated',
    delete: 'User Deleted',
    deleteTrnsc: 'Transaction Deleted',
  },
  failure: {
    exists: 'User is already exists',
    noTrnsc: 'There is no transactions for this user',
    noFoundTrnsc: 'Transaction not found',
    serverError: 'Server error',
  },
};

module.exports = {
  getRequireText,
  getValidText,
  getLengthText,
  serverMsg,
};
