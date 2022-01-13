import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import {
  HStack,
  Box,
  Center,
  Input,
  Table,
  Thead,
  Tbody,
  Button,
  Tr,
  Th,
  Td,
  VStack,
  Flex,
  useBoolean,
  Select,
  FormLabel,
} from '@chakra-ui/react';
import { ArrowDownIcon, ArrowUpIcon } from '@chakra-ui/icons';

import { useAppDispatch, useAppSelector } from 'redux/hooks';
import {
  calculateAmountAsync,
  deleteTransactionAsync,
  filterTransactionsByColumn,
  getTransactionForUpdate,
  getTransactionsAsync,
  sortTransactionsByColumn,
} from 'redux/Slices/transactionSlice';
import { getCategoriesAsync } from 'redux/Slices/categorySlice';
import { errorNotify, successNotify } from 'pages/Notify';
import { ToastContainer, Zoom } from 'react-toastify';
import routes from 'helper/routes';

export default function ListTransactions() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [netAmount, setNetAmount] = useState(0);

  const [firstDate, setFirstDate] = useState('false');
  const [lastDate, setLastDate] = useState('false');

  const [changeDateIcon, setChangeDateIcon] = useBoolean(false);
  const [changeAmountIcon, setChangeAmountIcon] = useBoolean(false);

  const [columnToFilter, setColumnToFilter] = useState('');

  const transactions = useAppSelector((state) => state.transactions);
  const categories = useAppSelector((state) => state.categories);

  useEffect(() => {
    dispatch(getTransactionsAsync());
    dispatch(getCategoriesAsync());
  }, [dispatch]);

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
    dispatch(getTransactionForUpdate({ TransactionId: transactionId }));
    navigate(`${routes.updateTransaction}/${transactionId}`);
  };

  const sortAmount = () => {
    if (changeAmountIcon)
      dispatch(sortTransactionsByColumn({ ColumnName: 'amount_inc' }));
    else dispatch(sortTransactionsByColumn({ ColumnName: 'amount_desc' }));
    setChangeAmountIcon.toggle();
  };

  const sortDate = () => {
    if (changeDateIcon)
      dispatch(sortTransactionsByColumn({ ColumnName: 'process_date_inc' }));
    else
      dispatch(sortTransactionsByColumn({ ColumnName: 'process_date_desc' }));
    setChangeDateIcon.toggle();
  };

  const filterList = (value: string) => {
    const filterValue = {
      column_name: columnToFilter,
      filter_value: value,
    };
    dispatch(filterTransactionsByColumn({ FilterValues: filterValue }));
  };

  const calculateAmount = async () => {
    console.log(firstDate);
    console.log(lastDate);
    const dates = {
      first_date: firstDate,
      last_date: lastDate,
    };
    const response: any = await dispatch(
      calculateAmountAsync({ Dates: dates })
    );
    console.log('response');
    console.log('response');
    console.log('response');
    console.log(response);
    console.log('response');
    setNetAmount(response.payload.netAmount);
  };

  return (
    <Center>
      <Box width='100%' alignItems='center' justify='center' align='center'>
        <VStack justify='center' align='center' w={'full'}>
          <Flex flex={1} direction={'row'}>
            <VStack margin={2}>
              <FormLabel color={'blue.300'}>Filtreleme Menüsü</FormLabel>
              <HStack>
                <FormLabel w={'150px'}>Kolon Adı : </FormLabel>
                <Select
                  w={'350px'}
                  placeholder='Filtrelemek istediğiniz tablo kolonunu seçiniz.'
                  name='filter_column'
                  onChange={(e) => setColumnToFilter(e.target.value)}
                  borderColor={'black'}
                >
                  <option value={'category_id'}>
                    Gelir/Gider Kategorisine göre filtrele.
                  </option>
                  <option value={'amount'}>Tutar'a göre filtrele.</option>
                  <option value={'currency'}>
                    Para Birimine göre filtrele.
                  </option>
                  <option value={'process_date'}>
                    İşlem Tarihine göre filtrele.
                  </option>
                  <option value={'description'}>
                    Açıklamaya göre filtrele
                  </option>
                </Select>
              </HStack>
              <HStack>
                <FormLabel w={'150px'}>Aranacak Kelime : </FormLabel>
                <Input
                  w={'350px'}
                  type={'text'}
                  onChange={(e) => filterList(e.target.value)}
                  name='filter_text'
                ></Input>
              </HStack>
            </VStack>
            <VStack>
              <FormLabel color={'blue.300'}>
                Net tutarı görebilmek için tarih aralığı seçiniz.
              </FormLabel>
              <HStack>
                <FormLabel w={'150px'}>Başlangıç Tarihini Seçiniz.</FormLabel>
                <Input
                  onChange={(e) => setFirstDate(e.target.value)}
                  w={'350px'}
                  type='date'
                ></Input>
              </HStack>
              <HStack>
                <FormLabel w={'150px'}>Bitiş Tarihini Seçiniz.</FormLabel>
                <Input
                  onChange={(e) => setLastDate(e.target.value)}
                  w={'350px'}
                  type='date'
                ></Input>
              </HStack>
              <Button
                backgroundColor={'green.300'}
                onClick={() => calculateAmount()}
              >
                Net Tutar Hesapla
              </Button>
            </VStack>
          </Flex>
          <Flex flex={8} align={'center'} justify={'center'}>
            <Box overflowX={'scroll'}>
              <HStack justify={'center'} align={'center'}>
                <FormLabel>Net Tutar : {Math.floor(netAmount)}</FormLabel>
              </HStack>
              <Table>
                <Thead>
                  <Tr bg='lightgray'>
                    <Th>Gelir/Gider Kategorisi</Th>
                    <Th>
                      <Button
                        background={'transparent'}
                        onClick={() => sortDate()}
                        _focus={{ border: 'none' }}
                        _hover={{ background: 'transparent' }}
                      >
                        İşlem Tarihi
                        {changeDateIcon ? <ArrowDownIcon /> : <ArrowUpIcon />}
                      </Button>
                    </Th>
                    <Th>
                      <Button
                        background={'transparent'}
                        onClick={() => sortAmount()}
                        _focus={{ border: 'none' }}
                        _hover={{ background: 'transparent' }}
                      >
                        Tutar
                        {changeAmountIcon ? <ArrowDownIcon /> : <ArrowUpIcon />}
                      </Button>
                    </Th>
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
        </VStack>
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
