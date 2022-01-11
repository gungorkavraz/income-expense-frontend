import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import {
  HStack,
  Box,
  Center,
  Input,
  Table,
  Thead,
  Tbody,
  Image,
  Button,
  Tr,
  Th,
  Td,
  VStack,
  Flex,
  RadioGroup,
  Stack,
  Radio,
} from '@chakra-ui/react';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
} from '@chakra-ui/icons';

import { useAppDispatch, useAppSelector } from 'redux/hooks';
import {
  deleteTransactionAsync,
  getTransactionsAsync,
} from 'redux/Slices/transactionSlice';
import { getCategoriesAsync } from 'redux/Slices/categorySlice';
import { errorNotify, successNotify } from 'pages/Notify';
import { ToastContainer, Zoom } from 'react-toastify';
import UpdateTransaction from './UpdateTransaction';
import routes from 'helper/routes';

export default function ListTransactions() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const transactions = useAppSelector((state) => state.transactions);
  const categories = useAppSelector((state) => state.categories);

  useEffect(() => {
    if (transactions.length > 0) {
    } else {
      dispatch(getTransactionsAsync());
    }

    if (categories.length > 0) {
    } else {
      dispatch(getCategoriesAsync());
    }
  }, [dispatch, categories, transactions]);

  const deleteTransaction = async (transactionId: number) => {
    var answer = window.confirm('Ürünü silmek istediğinizden emin misiniz ? ');
    if (answer) {
      const response: any = await dispatch(
        deleteTransactionAsync({ TransactionId: transactionId })
      );

      if (response.payload.Success) {
        successNotify(response.payload.Message);
      } else {
        errorNotify(response.payload.Message);
      }
    } else {
      console.log('Ürün silinmedi.');
    }
  };

  const updateTransaction = (transactionId: number) => {
    navigate(`${routes.updateTransaction}/${transactionId}`);
  };

  return (
    <Center>
      <Box width='80%' alignItems='center'>
        <HStack>
          {/* <Input
            type='text'
            onChange={(input) => filterList(input)}
            placeholder='Aramak istediğiniz ürün adını giriniz.'
            mb={4}
          ></Input> */}
          {/* 
              Button Click ile arama yapılmak istenirse yorum satırından çıkartılacak 
              <Input type="text" onChange={(input) => setFilterText(input.target.value)}></Input> 
              <Button type="submit" onClick={() => filterList()}>Ara</Button> 
          */}
        </HStack>
        <HStack>
          <Flex flex={2}>Filter Menu</Flex>

          <Flex flex={8} align={'center'} justify={'center'}>
            <Box overflowX={'scroll'}>
              <Table>
                <Thead>
                  <Tr bg='lightgray'>
                    <Th>Gelir/Gider Kategorisi</Th>
                    <Th>İşlem Tarihi</Th>
                    <Th>Tutar</Th>
                    <Th>Para Birimi</Th>
                    <Th>Açıklama</Th>
                    <Th>İşlemler</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {transactions.map((transaction: any) => (
                    <Tr key={transaction.id}>
                      <Td>
                        {categories.map(
                          (category: any) =>
                            category.id ===
                              parseInt(transaction?.category_id) &&
                            category.name
                        )}
                      </Td>
                      <Td minW={'150px'} maxW={'300px'}>
                        {transaction.process_date}
                      </Td>
                      <Td minW={'150px'} maxW={'300px'}>
                        {transaction.amount}
                      </Td>
                      <Td minW={'150px'} maxW={'300px'}>
                        {transaction.currency}
                      </Td>
                      <Td minW={'150px'} maxW={'300px'}>
                        {transaction.description}
                      </Td>
                      <Td minW={'150px'} maxW={'300px'}>
                        <VStack align={'left'}>
                          <Button
                            backgroundColor={'red.300'}
                            onClick={() => deleteTransaction(transaction.id)}
                          >
                            Sil
                          </Button>
                          <Button
                            backgroundColor={'blue.300'}
                            onClick={() => updateTransaction(transaction.id)}
                          >
                            Güncelle
                          </Button>
                        </VStack>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </Box>
          </Flex>
        </HStack>
        <ToastContainer
          position='bottom-right'
          transition={Zoom}
          theme='colored'
          pauseOnFocusLoss={false}
        />
      </Box>
    </Center>
  );
}
