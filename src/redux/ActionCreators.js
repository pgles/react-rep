import * as ActionTypes from './ActionTypes.js';
import {baseUrl} from '../shared/baseUrl.js';

export const addComment = (comment)  => ({
    type: ActionTypes.ADD_COMMENT,
    payload : comment
});

// export const addFeedback = (feedback)  => ({
//     type: ActionTypes.ADD_FEEDBACK,
//     payload : feedback
// });

export const postComment = (dishId,rating,author,comment) => (dispatch) => {
    const newComment = {
        dishId: dishId,
        rating: rating,
        author: author,
        comment: comment,
        date: new Date().toISOString()
    } 
    return fetch(baseUrl + 'comments',{
        method: 'POST',
        body: JSON.stringify(newComment),
        headers: {
            'Content-type': 'application/json'
        },
        credentials: "same-origin"
    })
    .then(response => {
        if(response.ok){
            return response;
        }
        else {
            var err = new Error('Error '+response.status + ': ' + response.statusText);
            err.response = response;
            throw err;
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(response => dispatch(addComment(response)))
    .catch(error => {console.log("Post Comments ",error.message);
    alert("Your comment cannot be posted\nError: "+error.message);
    })
    
}

export const postFeedback = (firstname,lastname,telnum,email,agree,controlType,message) => (dispatch) => {
    const newFeedback = {
        firstname: firstname,
        lastname: lastname,
        telnum: telnum,
        email: email,
        agree: agree,
        controlType: controlType,
        message: message
    } 
    return fetch(baseUrl + 'feedback',{
        method: 'POST',
        body: JSON.stringify(newFeedback),
        headers: {
            'Content-type': 'application/json'
        },
        credentials: "same-origin"
    })
    .then(response => {
        if(response.ok){
            return response;
        }
        else {
            var err = new Error('Error '+response.status + ': ' + response.statusText);
            err.response = response;
            throw err;
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(response => alert("Thank you for your feedback!\n"+JSON.stringify(response)))
    .catch(error => {console.log("Feedback  ",error.message);
    alert("Your feedback cannot be posted\nError: "+error.message);
    })
    
}
export const fetchDishes = () =>    (dispatch) => {
    dispatch(dishesLoading(true));

    return fetch(baseUrl + 'dishes')
            .then(response => {
                if(response.ok){
                    return response;
                }
                else {
                    var err = new Error('Error '+response.status + ': ' + response.statusText);
                    err.response = response;
                    throw err;
                }
            },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })
            .then(response => response.json())
            .then(dishes => dispatch(addDishes(dishes)))
            .catch(error => dispatch(dishesFailed(error.message)));
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

export const fetchComments = () => (dispatch) => {

    return fetch(baseUrl + 'comments')
            .then(response => {
                if(response.ok){
                    return response;
                }
                else {
                    var err = new Error('Error '+response.status + ': ' + response.statusText);
                    err.response = response;
                    throw err;
                }
            },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })
            .then(response => response.json())
            .then(comments => dispatch(addComments(comments)))
            .catch(error => dispatch(commentsFailed(error.message)));
}

export const commentsFailed = (errmess) => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload:errmess
});

export const addComments = (comments) => ({
    type:ActionTypes.ADD_COMMENTS,
    payload:comments
});

export const fetchPromos= () => (dispatch) => {
    dispatch(promosLoading(true));

    return fetch(baseUrl + 'promotions')
            .then(response => {
                if(response.ok){
                    return response;
                }
                else {
                    var err = new Error('Error '+response.status + ': ' + response.statusText);
                    err.response = response;
                    throw err;
                }
            },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })
            .then(response => response.json())
            .then(promos => dispatch(addPromos(promos)))
            .catch(error => dispatch(promosFailed(error.message)));
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

export const fetchLeaders = () =>    (dispatch) => {
    dispatch(leadersLoading(true));

    return fetch(baseUrl + 'leaders')
            .then(response => {
                if(response.ok){
                    return response;
                }
                else {
                    var err = new Error('Error '+response.status + ': ' + response.statusText);
                    err.response = response;
                    throw err;
                }
            },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })
            .then(response => response.json())
            .then(leaders => dispatch(addLeaders(leaders)))
            .catch(error => dispatch(leadersFailed(error.message)));
}

export const leadersLoading = () => ({
    type:ActionTypes.LEADERS_LOADING,

});

export const leadersFailed = (errMess) => ({
    type: ActionTypes.LEADERS_FAILED,
    payload:errMess
});

export const addLeaders = (leaders) => ({
    type:ActionTypes.ADD_LEADERS,
    payload:leaders
});


