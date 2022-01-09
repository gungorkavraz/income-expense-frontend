import axios from 'utils/preparedAxios';

interface CategoryInformation {
  categoryName: string;
  isIncome: boolean;
}

export default class categoryService {
  addCategory(categoryInformation: CategoryInformation) {
    return axios
      .post(`${process.env.REACT_APP_API_CATEGORIES_URI}`, categoryInformation)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        return err.response;
      });
  }
}
