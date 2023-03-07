import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension'

import { postsReducer, newPostReducer, postReducer, postDetailsReducer} from './reducers/postReducers'
import { authReducer, userReducer, forgotPasswordReducer, userDetailsReducer } from './reducers/userReducers'


const reducer = combineReducers({
    posts: postsReducer,
    postDetails: postDetailsReducer,
    newPost: newPostReducer,
    post: postReducer,

    auth: authReducer,
    user: userReducer,
 
    userDetails: userDetailsReducer,
    forgotPassword: forgotPasswordReducer,

})


let initialState = {
    cart: {
        cartItems: localStorage.getItem('cartItems')
            ? JSON.parse(localStorage.getItem('cartItems'))
            : [],
        shippingInfo: localStorage.getItem('shippingInfo')
            ? JSON.parse(localStorage.getItem('shippingInfo'))
            : {}
    }
}

const middlware = [thunk];
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middlware)))

export default store;