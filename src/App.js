import { Box, Text } from '@chakra-ui/react';
import routes from 'helper/routes';
import AddCategory from 'pages/CategoryOperations/AddCategory';
import SignIn from 'pages/UserOperations/SignIn';
import SignUp from 'pages/UserOperations/SignUp';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Switch,
} from 'react-router-dom';

import NavBar from '../src/pages/NavBar/NavBar.tsx';
import { PrivateRoute } from 'pages/PrivateRoute';
import PageNotFound from 'pages/PageNotFound';
import { getAuthenticatedUserAsync } from 'redux/Slices/userOperationSlice';

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userOperations);

  useEffect(() => {
    // Render the component on user operations(logout/login).
    if (user.length === 0) dispatch(getAuthenticatedUserAsync());
  }, [user]);

  console.log('rendered');
  return (
    <Router>
      <Box className='App'>
        {localStorage.getItem('accessToken') !== null ? (
          <>
            <NavBar></NavBar>
            <Routes>
              <Route
                exact
                path={routes.addCategory}
                element={<PrivateRoute component={AddCategory} />}
              />
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
