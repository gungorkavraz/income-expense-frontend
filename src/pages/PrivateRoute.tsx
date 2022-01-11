import { Navigate, useNavigate } from 'react-router-dom';
import SignIn from './UserOperations/SignIn';
import { useAppSelector, useAppDispatch } from 'redux/hooks';
import store from '../redux/store';
import PageNotFound from './PageNotFound';

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

  return <SignIn />;
};
