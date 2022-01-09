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
  Image,
  VStack,
} from '@chakra-ui/react';

export default function AddCategory() {

  const initialValues = {};

  const addProductCode = async (values: Object) => {
    console.log(values);
  };

  return (
    <Formik initialValues={initialValues} onSubmit={addProductCode}>
      {(props) => (
        <Form>
          <FormControl id='ProductCode'>
            <FormLabel>Ürün Kodu</FormLabel>
            <Input
              onChange={props.handleChange}
              name='ProductCode'
              type='text'
            />
          </FormControl>
          <Button type='submit' colorScheme={'blue'} variant={'solid'} mt={4}>
            Ürün Kodu Kaydet
          </Button>
        </Form>
      )}
    </Formik>
  );
}
