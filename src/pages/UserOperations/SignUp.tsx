import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Stack,
  Image,
  Select,
  HStack,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { Form, Formik } from 'formik';

import routes from '../../helper/routes';
import { useDispatch } from 'react-redux';

import { successNotify, errorNotify } from '../Notify';
import { ToastContainer, Zoom } from 'react-toastify';
import { registerUserAsync } from 'redux/Slices/userOperationSlice';

export default function SignUp() {
  const dispatch = useDispatch();

  interface registerValues {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
  }

  const initialValues = {
    name: '',
    password: '',
    email: '',
    password_confirmation: '',
  };

  const registerUser = async (values: registerValues) => {
    const response: any = await dispatch(
      registerUserAsync({ UserInformation: values })
    );

    if (response.payload.Success) {
      successNotify(response.payload.Message);
    } else {
      errorNotify(response.payload.Message);
    }
  };

  return (
    <Formik initialValues={initialValues} onSubmit={registerUser}>
      {(props) => (
        <Form>
          <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
            <Flex flex={1}>
              <Image
                borderRightRadius={30}
                alt={'Login Image'}
                objectFit={'cover'}
                src={
                  'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80'
                }
              />
            </Flex>
            <Flex p={8} flex={1} align={'center'} justify={'center'}>
              <Stack spacing={5} w={'full'} maxW={'lg'}>
                <Heading fontSize={'2xl'} align={'center'}>
                  Hesap Oluştur
                </Heading>
                <Stack>
                  <Stack spacing={5} direction='row' justify='center'>
                    <Flex direction='column'>
                      <HStack>
                        <FormControl id='name'>
                          <FormLabel>Ad</FormLabel>
                          <Input
                            required
                            onChange={props.handleChange}
                            name='name'
                            type='text'
                            minLength={3}
                          />
                        </FormControl>
                        <FormControl id='email'>
                          <FormLabel>Mail Adresi</FormLabel>
                          <Input
                            required
                            onChange={props.handleChange}
                            name='email'
                            type='email'
                          />
                        </FormControl>
                      </HStack>
                      <HStack>
                        <FormControl id='password'>
                          <FormLabel>Şifre</FormLabel>
                          <Input
                            required
                            onChange={props.handleChange}
                            name='password'
                            type='password'
                            minLength={5}
                          />
                        </FormControl>
                        <FormControl id='password_confirmation'>
                          <FormLabel>Şifre Doğrula</FormLabel>
                          <Input
                            required
                            onChange={props.handleChange}
                            name='password_confirmation'
                            type='password'
                            minLength={5}
                          />
                        </FormControl>
                      </HStack>
                    </Flex>
                  </Stack>
                </Stack>

                <Stack spacing={6}>
                  <Stack
                    direction={{ base: 'column', sm: 'row' }}
                    justify={'end'}
                  >
                    <Link as={RouterLink} to={routes.signIn} color={'blue.500'}>
                      Hesabım Var
                    </Link>
                  </Stack>
                  <Button type='submit' colorScheme={'blue'} variant={'solid'}>
                    Hesap Oluştur
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
          </Stack>
        </Form>
      )}
    </Formik>
  );
}
