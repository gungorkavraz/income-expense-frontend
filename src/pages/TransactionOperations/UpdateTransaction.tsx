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
import { useEffect, useState } from 'react';
import { getCategoriesAsync } from 'redux/Slices/categorySlice';
import {
  getTransactionForUpdate,
  getTransactionsAsync,
  updateTransactionAsync,
} from 'redux/Slices/transactionSlice';
import { useParams } from 'react-router';

export default function UpdateTransaction() {
  const dispatch = useAppDispatch();
  const { id } = useParams();

  const categories = useAppSelector((state) => state.categories);
  const transactions: any = useAppSelector((state) => state.transactions);

  const [categoryId, setCategoryId] = useState('');
  const [amount, setAmount] = useState(0);
  const [currency, setCurrency] = useState('');
  const [description, setDescription] = useState('');
  const [processDate, setProcessDate] = useState('');

  useEffect(() => {
    if (transactions.length > 0) {
      const selectedCategory: any = categories.filter(
        (category: any) => category.id === transactions[0].category_id
      );

      setCategoryId(selectedCategory[0].id);
      setAmount(transactions[0].amount);
      setCurrency(transactions[0].currency);
      if (transactions[0].description !== null)
        setDescription(transactions[0].description);
      else {
        setDescription('');
      }
      setProcessDate(transactions[0].process_date);
    }
    dispatch(getCategoriesAsync());

    dispatch(getTransactionForUpdate({ TransactionId: id })).then(
      (response: any) =>
        response.payload.TransactionToUpdate.length > 0
          ? ''
          : errorNotify(response.payload.Message + ': ' + id)
    );
  }, [dispatch, transactions.length]);

  const initialValues = {
    id: '',
    category_id: 0,
    process_date: new Date(),
    amount: 0,
    currency: '',
    description: '',
  };

  const updateTransaction = async () => {
    const updatedInformation = {
      id: id!,
      category_id: parseInt(categoryId),
      process_date: processDate,
      amount: amount,
      currency: currency,
      description: description,
    };

    const response: any = await dispatch(
      updateTransactionAsync({ TransactionInformation: updatedInformation })
    );

    if (response.payload.Success) {
      successNotify(response.payload.Message);
    } else {
      errorNotify(response.payload.Message);
    }
  };

  return (
    <Formik initialValues={initialValues} onSubmit={updateTransaction}>
      {(props) => (
        <Form>
          <Stack minH={'95vh'} direction={{ base: 'column', md: 'row' }}>
            <Flex p={8} flex={1} align={'center'} justify={'center'}>
              <Stack spacing={4} w={{ base: 'xs', md: 'full' }} maxW={'lg'}>
                <Heading fontSize={'2xl'} pb={8} align={'center'}>
                  Gelir/Gider Güncelle
                </Heading>
                <Stack direction={{ base: 'column', md: 'column' }}>
                  <HStack w={'full'}>
                    <FormControl id='category_id'>
                      <FormLabel>Gelir/Gider Kategorisi Seçiniz</FormLabel>
                      <Select
                        required
                        onChange={(e) => setCategoryId(e.target.value)}
                        name='category_id'
                        type='text'
                        value={categoryId}
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
                        onChange={(e) => setProcessDate(e.target.value)}
                        name='process_date'
                        type='date'
                        value={processDate}
                      />
                    </FormControl>
                  </HStack>
                  <HStack w={'full'}>
                    <FormControl id='amount'>
                      <FormLabel>Miktar</FormLabel>
                      <Input
                        required
                        onChange={(e) => setAmount(parseInt(e.target.value))}
                        name='amount'
                        type='number'
                        value={amount}
                      />
                    </FormControl>
                    <FormControl id='currency'>
                      <FormLabel>Para Birimi</FormLabel>
                      <Select
                        required
                        onChange={(e) => setCurrency(e.target.value)}
                        name='currency'
                        placeholder='Gelir/Gider Para Birimi Seçiniz'
                        value={currency}
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
                        onChange={(e) => setDescription(e.target.value)}
                        name='description'
                        type='text'
                        value={description}
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
                    Gelir/Gider Güncelle
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
