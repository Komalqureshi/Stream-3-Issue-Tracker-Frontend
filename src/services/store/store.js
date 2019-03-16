import {createStore,applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import { composeWithDevTools } from 'redux-devtools-extension';


function saveToLocalStorage(state){
    try {
        const serializedstate = JSON.stringify(state);
        localStorage.setItem('ua_state',serializedstate);
    } catch (error) {
        console.log(error);
    }
}

function loadFromLocalStorage(){
    try {
        const serializedstate = localStorage.getItem('ua_state');
        if(serializedstate ===null)return undefined;
        return JSON.parse(serializedstate)
    } catch (error) {
        console.log(error);
        return undefined
    }
}

const persistedstate = loadFromLocalStorage();

const middleware = [thunk] ;

const store = createStore(
    rootReducer,
    persistedstate,
    composeWithDevTools(applyMiddleware(...middleware)));

store.subscribe(() => saveToLocalStorage(store.getState()));

export default store;