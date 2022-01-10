import axios from 'utils/preparedAxios';

interface CategoryInformation {
  category_name: string;
  is_income: boolean;
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

  getCategories() {
    return axios
      .get(`${process.env.REACT_APP_API_CATEGORIES_URI}`)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        return err.response;
      });
  }
}
