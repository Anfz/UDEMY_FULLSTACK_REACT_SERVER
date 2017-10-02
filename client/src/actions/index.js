import axios from 'axios';
import {FETCH_USER} from './types';

export const fetchUser = () => async (dispatch) => {
    const currentUserResponse = await axios.get('/api/current_user');
    
    dispatch({type: FETCH_USER, payload: currentUserResponse.data});
};

export const handleToken = (token) => async dispatch => {
    const userResponse = await axios.post('/api/stripe', token);

    dispatch({type: FETCH_USER, payload: userResponse.data});
}