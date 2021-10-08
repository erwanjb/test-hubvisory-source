import { getActiveGameOver } from "../store/activeGameOver/selectors";
import { useSelector } from 'react-redux';

const useActiveGameOver = () => useSelector(getActiveGameOver);

export default useActiveGameOver;