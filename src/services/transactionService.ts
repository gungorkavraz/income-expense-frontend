import axios from 'utils/preparedAxios';

interface transactionValues {
  category_id: number;
  process_date: Date;
  amount: number;
  currency: string;
  description?: string;
}

interface filterInformation {
  column_name: string;
  filter_value: string;
}

interface dateInformation {
  first_date: string;
  last_date: string;
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

  sortTransactionsByColumn(columnName: string) {
    return axios
      .get(`${process.env.REACT_APP_API_TRANSACTION_URI}?${columnName}`)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        return err.response;
      });
  }

  filterTransactionsByColumn(filterInformation: filterInformation) {
    return axios
      .get(
        `${process.env.REACT_APP_API_TRANSACTION_URI}?${filterInformation.column_name}&filter_value=${filterInformation.filter_value}`
      )
      .then((response) => {
        return response;
      })
      .catch((err) => {
        return err.response;
      });
  }

  calculateAmount(dateInformation: dateInformation) {
    return axios
      .get(
        `${process.env.REACT_APP_API_TRANSACTION_URI}?first_date=${dateInformation.first_date}&last_date=${dateInformation.last_date}`
      )
      .then((response) => {
        return response;
      })
      .catch((err) => {
        return err.response;
      });
  }
}
