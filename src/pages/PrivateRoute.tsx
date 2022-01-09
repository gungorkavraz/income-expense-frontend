import { Navigate, useNavigate } from 'react-router-dom';
import SignIn from './UserOperations/SignIn';
import { useSelector as useReduxSelector } from 'react-redux';
import store from '../redux/store';
import PageNotFound from './PageNotFound';

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

interface Props {
  component: React.ComponentType;
  path?: string;
  Roles: Array<string>;
}

export const PrivateRoute: React.FC<Props> = ({
  component: RouteComponent,
  Roles,
}) => {
  const isAuthenticated = localStorage.getItem('accessToken');

  const userUnauthorized = isAuthenticated === null;

  if (userUnauthorized) {
    return <SignIn />;
  }
  if (!userUnauthorized) {
    return <RouteComponent />;
  }

  return <Navigate to='/' />;
};
