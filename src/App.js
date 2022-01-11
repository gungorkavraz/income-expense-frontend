import { Box, Text } from '@chakra-ui/react';
import routes from 'helper/routes';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Switch,
} from 'react-router-dom';

import { PrivateRoute } from 'pages/PrivateRoute';
import { getAuthenticatedUserAsync } from 'redux/Slices/userOperationSlice';

import PageNotFound from 'pages/PageNotFound';
import SignIn from 'pages/UserOperations/SignIn';
import SignUp from 'pages/UserOperations/SignUp';
import NavBar from '../src/pages/NavBar/NavBar.tsx';
import AddCategory from 'pages/CategoryOperations/AddCategory';
import AddTransaction from 'pages/TransactionOperations/AddTransaction';
import ListTransactions from 'pages/TransactionOperations/ListTransactions';
import UpdateTransaction from 'pages/TransactionOperations/UpdateTransaction';

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userOperations);

  useEffect(() => {
    // Render the component on user operations(logout/login).
    if (user.length === 0) dispatch(getAuthenticatedUserAsync());
  }, [user]);

  return (
    <Router>
      <Box className='App'>
        {localStorage.getItem('accessToken') !== null ||
        localStorage.getItem('accessToken') !== 'undefined' ? (
          <>
            <NavBar></NavBar>
            <Routes>
              <Route
                exact
                path={routes.addCategory}
                element={<PrivateRoute component={AddCategory} />}
              />
              <Route
                exact
                path={routes.addTransaction}
                element={<PrivateRoute component={AddTransaction} />}
              />
              <Route
                exact
                path={routes.listTransactions}
                element={<PrivateRoute component={ListTransactions} />}
              />
              <Route
                path={`${routes.updateTransaction}/:id`}
                element={<PrivateRoute component={UpdateTransaction} />}
              />
              <Route
                exact
                path={routes.signIn}
                element={<PrivateRoute component={SignIn} />}
              />
              <Route exact path={routes.signUp} element={<SignUp />} />
              <Route path={'*'} element={<PageNotFound />}></Route>
            </Routes>
          </>
        ) : (
          <>
            <NavBar></NavBar>
            <Routes>
              <Route
                exact
                path={routes.signIn}
                element={<PrivateRoute component={SignIn} />}
              />
              <Route exact path={routes.signUp} element={<SignUp />} />
              <Route path='*' element={<SignIn />}></Route>
            </Routes>
          </>
        )}
      </Box>
    </Router>
  );
}

export default App;
