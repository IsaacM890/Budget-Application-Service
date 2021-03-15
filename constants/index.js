/** @format */

const serverMsg = {
  success: {
    create: 'User Registred',
    createTrnsc: 'Transaction Registred',
    update: 'User Updated',
    delete: 'User Deleted',
    deleteTrnsc: 'Transaction Deleted',
  },
  failure: {
    exists: 'User is already exists',
    existsTrnsc: 'User is already exists ',
    noTrnsc: 'There is no transactions for this user',
    noFoundTrnsc: 'Transaction not found',
    serverError: 'Server error',
  },
};

module.exports = {
  serverMsg,
};
