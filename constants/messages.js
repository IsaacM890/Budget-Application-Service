/** @format */

const serverMsg = {
  success: {
    create: 'User Registred',
    createTrnsc: 'Transaction Created',
    update: 'User Updated',
    delete: 'User Deleted',
    deleteTrnsc: 'Transaction Deleted',
  },
  error: {
    exists: 'User is already exists',
    existsTrnsc: 'transaction is already exists ',
    noTrnsc: 'There is no transactions for this user',
    noFoundTrnsc: 'Transaction not found',
    serverError: 'Server error',
  },
};

module.exports = {
  serverMsg,
};
