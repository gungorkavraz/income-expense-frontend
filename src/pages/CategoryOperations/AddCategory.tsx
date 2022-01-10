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

import { useAppDispatch } from 'redux/hooks';
import { successNotify, errorNotify } from '../Notify';
import { ToastContainer, Zoom } from 'react-toastify';
import { addCategoryAsync } from 'redux/Slices/categorySlice';

export default function AddCategory() {
  const dispatch = useAppDispatch();
  interface categoryInitialValues {
    category_name: string;
    category_type: string;
  }

  const categoryTypes = {
    INCOME: 'Income',
    EXPENSE: 'Expense',
  };

  const initialValues = {
    category_name: '',
    category_type: '',
  };

  const addCategory = async (values: categoryInitialValues) => {
    console.log(values);
    const categoryInformation = {
      category_name: values.category_name,
      is_income: false,
    };
    if (values.category_type === categoryTypes.INCOME) {
      categoryInformation.is_income = true;
    } else {
      categoryInformation.is_income = false;
    }

    dispatch(addCategoryAsync({ CategoryInformation: categoryInformation }));
  };

  return (
    <Formik initialValues={initialValues} onSubmit={addCategory}>
      {(props) => (
        <Form>
          <Stack minH={'95vh'} direction={{ base: 'column', md: 'row' }}>
            <Flex p={8} flex={1} align={'center'} justify={'center'}>
              <Stack spacing={4} w={{ base: 'xs', md: 'full' }} maxW={'lg'}>
                <Heading fontSize={'2xl'} pb={8} align={'center'}>
                  Kategori Kayıt
                </Heading>
                <Stack direction={{ base: 'column', md: 'row' }}>
                  <VStack w={'full'}>
                    <FormControl id='category_name'>
                      <FormLabel>Kategori Adı</FormLabel>
                      <Input
                        required
                        onChange={props.handleChange}
                        name='category_name'
                        type='text'
                      />
                    </FormControl>
                    <FormControl id='category_type'>
                      <FormLabel>Kategori Türü</FormLabel>
                      <Select
                        required
                        onChange={props.handleChange}
                        name='category_type'
                        type='text'
                        placeholder='Kategori Türünü Seçiniz'
                      >
                        <option value='Income'>Gelir</option>
                        <option value='Expense'>Gider</option>
                      </Select>
                    </FormControl>
                    ß
                  </VStack>
                </Stack>
                <Stack spacing={6}>
                  <Button
                    type='submit'
                    colorScheme={'blue'}
                    variant={'solid'}
                    mt={4}
                  >
                    Şirket Kaydet
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
