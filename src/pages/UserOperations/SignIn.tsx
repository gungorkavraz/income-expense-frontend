import { useAppSelector, useAppDispatch } from 'redux/hooks';
import { useNavigate } from 'react-router';
import {
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Stack,
  Image,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { Formik, Form } from 'formik';

import routes from '../../helper/routes';



import { successNotify, errorNotify } from '../Notify';
import { ToastContainer, Zoom } from 'react-toastify';
import { loginUserAsync } from 'redux/Slices/userOperationSlice';

export default function SignIn() {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  interface loginInitialValues {
    email: string;
    password: string;
  }
  const initialValues = {
    email: '',
    password: '',
  };

  const onUserLogin = async (values: loginInitialValues) => {
    const response: any = await dispatch(
      loginUserAsync({ UserInformation: values })
    );

    console.log(response);
    if (response.payload.Success) {
      navigate(routes.home);
      window.location.reload();
      successNotify(response.payload.Message);
    } else {
      errorNotify('Email veya şifre hatalı.');
    }
  };
  return (
    <Formik initialValues={initialValues} onSubmit={onUserLogin}>
      {(props) => (
        <Form>
          <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
            <Flex p={8} flex={1} align={'center'} justify={'center'}>
              <Stack spacing={4} w={'full'} maxW={'md'}>
                <Heading fontSize={'2xl'}>Giriş Yap</Heading>
                <FormControl id='email'>
                  <FormLabel name='email'>Email </FormLabel>
                  <Input
                    required
                    onChange={props.handleChange}
                    name='email'
                    type='email'
                  />
                </FormControl>
                <FormControl id='password'>
                  <FormLabel name='password'>Şifre</FormLabel>
                  <Input
                    required
                    onChange={props.handleChange}
                    name='password'
                    type='password'
                    minLength={5}
                  />
                </FormControl>
                <Stack spacing={6}>
                  <Stack
                    direction={{ base: 'column', sm: 'row' }}
                    align={'start'}
                    justify={'space-between'}
                  >
                    <Link as={RouterLink} to={routes.signUp} color={'blue.500'}>
                      Hesabım Yok
                    </Link>
                  </Stack>
                  <Button type='submit' colorScheme={'blue'} variant={'solid'}>
                    Giriş Yap
                  </Button>
                  <ToastContainer
                    position='bottom-left'
                    transition={Zoom}
                    theme='colored'
                    pauseOnFocusLoss={false}
                  />
                </Stack>
              </Stack>
            </Flex>
            <Flex flex={1.5}>
              <Image
                borderLeftRadius={30}
                alt={'Login Image'}
                objectFit={'cover'}
                src={
                  'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80'
                }
              />
            </Flex>
          </Stack>
        </Form>
      )}
    </Formik>
  );
}
