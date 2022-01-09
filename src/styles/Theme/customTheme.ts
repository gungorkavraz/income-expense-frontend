import { extendTheme } from '@chakra-ui/react';
import { InputStyles as Input } from '../Components/inputStyles';

const theme = extendTheme({
  components: {
    Input,
  },
});

export default theme;
