import * as ActionTypes from './ActionTypes.js';
import {baseUrl} from '../shared/baseUrl.js';

export const addComment = (dishId,rating,author,comment)  => ({
    type: ActionTypes.ADD_COMMENT,
    payload : {
        dishId: dishId,
        rating : rating,
        author : author,
        comment : comment
    }
});

export const fetchDishes = () => async (dispatch) => {
    dispatch(dishesLoading(true));

    const response = await fetch(baseUrl + 'dishes');
    const dishes = await response.json();
    return dispatch(addDishes(dishes));
}

export const dishesLoading = () => ({
    type:ActionTypes.DISHES_LOADING,

});

export const dishesFailed = (errMess) => ({
    type: ActionTypes.DISHES_FAILED,
    payload:errMess
});

export const addDishes = (dishes) => ({
    type:ActionTypes.ADD_DISHES,
    payload:dishes
});

export const fetchComments = () => async (dispatch) => {

    const response = await fetch(baseUrl + 'comments');
    const comments = await response.json();
    return dispatch(addComments(comments));
}

export const commentsFailed = (errmess) => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload:errmess
});

export const addComments = (comments) => ({
    type:ActionTypes.ADD_COMMENTS,
    payload:comments
});

export const fetchPromos= () => async (dispatch) => {
    dispatch(promosLoading(true));

    const response = await fetch(baseUrl + 'promotions');
    const promos = await response.json();
    return dispatch(addPromos(promos));
}

export const promosLoading = () => ({
    type:ActionTypes.PROMOS_LOADING,

});

export const promosFailed = (errMess) => ({
    type: ActionTypes.PROMOS_FAILED,
    payload:errMess
});

export const addPromos = (promos) => ({
    type:ActionTypes.ADD_PROMOS,
    payload:promos
});

