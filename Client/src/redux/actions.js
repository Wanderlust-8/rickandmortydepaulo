export const SET_ID_USER = "SET_ID_USER";
export const ADD_FAV = "ADD_FAV";
export const REMOVE_FAV = "REMOVE_FAV";
export const RESET = "RESET";
export const FILTER = "FILTER";
export const ORDER = "ORDER";
import axios from 'axios';

const API_URL_BASE = import.meta.env.VITE_API_URL_BASE || 'http://localhost:3001/rickandmorty';
const FAV_URL = import.meta.env.VITE_RM_FAV || '/fav';
const RM_FAV = API_URL_BASE + FAV_URL;

export const addFav = (character) => {
    const endpoint = RM_FAV;
    return async (dispatch) => {
        try {
            const { data } = await axios.post(endpoint, character);
            return dispatch({
                type: ADD_FAV,
                payload: data,
            });
        } catch (error) {
            console.error("Error while adding to favorites:", error.message);
        }
    };
};

export const removeFav = (dataFav) => {
    const endpoint = RM_FAV + "/" + dataFav.id;
    const myBody = { userId: dataFav.userId.toString() };
    return async (dispatch) => {
        try {
            const { data } = await axios.put(endpoint, myBody);
            return dispatch({
                type: REMOVE_FAV,
                payload: data,
            });
        } catch (error) {
            console.error("Error while removing from favorites:", error.message);
        }
    };
};

export const reset = () => {
    const endpoint = RM_FAV + "/999";
    return (dispatch) => {
        axios.delete(endpoint).then(({ data }) => {
            return dispatch({
                type: 'RESET',
                payload: data,
            });
        });
    };
};

export const filterCards = (criteria) => {
    return { type: FILTER, payload: criteria };
};

export const orderCards = (criteria) => {
    return { type: ORDER, payload: criteria };
};

export const saveIdUser = (id) => {
    return { type: SET_ID_USER, payload: id };
};
