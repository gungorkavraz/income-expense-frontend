import axios from 'utils/preparedAxios';

interface transactionValues {
  category_id: number;
  process_date: Date;
  amount: number;
  currency: string;
  description?: string;
}

interface transactionToDelete {
  TransactionId: number;
}

export default class transactionService {
  addTransaction(transactionInformation: transactionValues) {
    return axios
      .post(
        `${process.env.REACT_APP_API_TRANSACTION_URI}`,
        transactionInformation
      )
      .then((response) => {
        return response;
      })
      .catch((err) => {
        return err.response;
      });
  }

  getTransactions() {
    return axios
      .get(`${process.env.REACT_APP_API_TRANSACTION_URI}`)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        return err.response;
      });
  }

  deleteTransaction(transactionId: number) {
    return axios
      .delete(`${process.env.REACT_APP_API_TRANSACTION_URI}/${transactionId}`)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        return err.response;
      });
  }

  getTransactionForUpdate(transactionId: number) {
    return axios
      .get(`${process.env.REACT_APP_API_TRANSACTION_URI}/${transactionId}`)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        return err.response;
      });
  }

  updateTransaction(transactionId: number) {
    return axios
      .put(`${process.env.REACT_APP_API_TRANSACTION_URI}/${transactionId}`)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        return err.response;
      });
  }
}
