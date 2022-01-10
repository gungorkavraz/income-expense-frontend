import axios from 'utils/preparedAxios';

interface transactionValues {
  category_id: number;
  process_date: Date;
  amount: number;
  currency: string;
  description: string;
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
}
