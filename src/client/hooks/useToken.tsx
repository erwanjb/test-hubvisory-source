import { getToken } from "../store/auth/selectors";
import { useSelector } from 'react-redux';

const useToken = () => useSelector(getToken);

export default useToken;