/** @format */

const serverMsg = {
  success: {
    create: 'User Registred',
    createTrnsc: 'Transaction Created',
    update: 'User Updated',
    delete: 'User Deleted',
    deleteTrnsc: 'Transaction Deleted',
    updateTrnsc: 'Transaction Updated',
    getAllTrnsc: 'This are all the Transactions stored in DB',
    userFound: 'User Found',
  },
  error: {
    noExists: 'User not exists',
    exists: 'User is already exists',
    existsTrnsc: 'transaction is already exists ',
    noTrnsc: 'There is no transactions for this user',
    noFoundTrnsc: 'Transaction not found',
    noFoundUser: 'User not found',
    serverError: 'Server error',
    updateErr: 'There is not field to update',
  },
};

module.exports = {
  serverMsg,
};
