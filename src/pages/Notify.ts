import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const successNotify = (message: string) => {
  toast.success(message);
};

export const errorNotify = (message: string) => {
  toast.error(message);
};

export const warningNotify = (message: string) => {
  toast.warning(message);
};
