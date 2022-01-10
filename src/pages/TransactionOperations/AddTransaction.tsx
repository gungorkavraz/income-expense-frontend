import { Formik, Form } from 'formik';
import axios from 'axios';
import {
  Flex,
  Stack,
  Heading,
  FormControl,
  FormLabel,
  Button,
  HStack,
  Select,
  Input,
  Box,
  VStack,
} from '@chakra-ui/react';

import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { successNotify, errorNotify } from '../Notify';
import { ToastContainer, Zoom } from 'react-toastify';
import { useEffect } from 'react';
import { getCategoriesAsync } from 'redux/Slices/categorySlice';
import {
  addTransactionAsync,
  getTransactionsAsync,
} from 'redux/Slices/transactionSlice';

export default function AddTransaction() {
  const dispatch = useAppDispatch();

  const categories = useAppSelector((state) => state.categories);

  useEffect(() => {
    if (categories.length > 0) {
    } else {
      dispatch(getCategoriesAsync());
    }
  }, [dispatch]);

  interface transactionInitialValues {
    category_id: number;
    process_date: Date;
    amount: number;
    currency: string;
    description: string;
  }

  const initialValues = {
    category_id: 0,
    process_date: new Date(),
    amount: 0,
    currency: '',
    description: '',
  };

  const addTransaction = async (values: transactionInitialValues) => {
    console.log(values);

    const response: any = await dispatch(
      addTransactionAsync({ TransactionInformation: values })
    );
    console.log(response);
    if (response.payload.Success) {
      successNotify(response.payload.Message);
    } else {
      errorNotify(response.payload.Message);
    }
  };

  return (
    <Formik initialValues={initialValues} onSubmit={addTransaction}>
      {(props) => (
        <Form>
          <Stack minH={'95vh'} direction={{ base: 'column', md: 'row' }}>
            <Flex p={8} flex={1} align={'center'} justify={'center'}>
              <Stack spacing={4} w={{ base: 'xs', md: 'full' }} maxW={'lg'}>
                <Heading fontSize={'2xl'} pb={8} align={'center'}>
                  Gelir/Gider Kayıt
                </Heading>
                <Stack direction={{ base: 'column', md: 'column' }}>
                  <HStack w={'full'}>
                    <FormControl id='category_id'>
                      <FormLabel>Gelir/Gider Kategorisi Seçiniz</FormLabel>
                      <Select
                        required
                        onChange={props.handleChange}
                        name='category_id'
                        type='text'
                        placeholder='Gelir/Gider Kategorisi Seçiniz'
                      >
                        {categories.map((category: any) => (
                          <option key={category?.id} value={category?.id}>
                            {category?.name}
                            {' - '}
                            {category?.is_income ? 'Gelir' : 'Gider'}
                          </option>
                        ))}
                      </Select>
                    </FormControl>
                    <FormControl id='process_date'>
                      <FormLabel>İşlem Tarihi</FormLabel>
                      <Input
                        required
                        onChange={props.handleChange}
                        name='process_date'
                        type='date'
                      />
                    </FormControl>
                  </HStack>
                  <HStack w={'full'}>
                    <FormControl id='amount'>
                      <FormLabel>Miktar</FormLabel>
                      <Input
                        required
                        onChange={props.handleChange}
                        name='amount'
                        type='number'
                      />
                    </FormControl>
                    <FormControl id='currency'>
                      <FormLabel>Para Birimi</FormLabel>
                      <Select
                        required
                        onChange={props.handleChange}
                        name='currency'
                        placeholder='Gelir/Gider Para Birimi Seçiniz'
                      >
                        <option value={'TRY'}>TRY</option>
                        <option value={'EUR'}>EUR</option>
                        <option value={'USD'}>USD</option>
                      </Select>
                    </FormControl>
                  </HStack>
                  ,
                  <HStack w={'full'}>
                    <FormControl id='description'>
                      <FormLabel>Açıklama</FormLabel>
                      <Input
                        onChange={props.handleChange}
                        name='description'
                        type='text'
                      />
                    </FormControl>
                  </HStack>
                </Stack>
                <Stack spacing={6}>
                  <Button
                    type='submit'
                    colorScheme={'blue'}
                    variant={'solid'}
                    mt={4}
                  >
                    Gelir/Gider Kaydet
                  </Button>
                  <ToastContainer
                    position='bottom-right'
                    transition={Zoom}
                    theme='colored'
                    pauseOnFocusLoss={false}
                  />
                </Stack>
              </Stack>
            </Flex>
            {/* <Flex flex={2.2} display={{ base: "none", md: "none", lg: "none", xl: "flex" }}>
                        <ListStocks></ListStocks>
                    </Flex> */}
          </Stack>
        </Form>
      )}
    </Formik>
  );
}
