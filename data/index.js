/**
 * External dependencies
 */
import { createStore, combineReducers } from 'redux';
import { flowRight, get } from 'lodash';

/**
 * Module constants
 */
const reducers = {};
const enhancers = [];
if ( window.__REDUX_DEVTOOLS_EXTENSION__ ) {
	enhancers.push( window.__REDUX_DEVTOOLS_EXTENSION__() );
}

const initialReducer = () => ( {} );
const store = createStore( initialReducer, {}, flowRight( enhancers ) );

/**
 * Registers a new sub reducer to the global state and returns a Redux-like store object.
 *
 * @param {String}  key     Reducer key
 * @param {Object}  reducer Reducer function
 *
 * @return {Object}         Store Object
 */
export function registerReducer( key, reducer ) {
	reducers[ key ] = reducer;
	store.replaceReducer( combineReducers( reducers ) );

	return {
		dispatch: store.dispatch,
		getState: () => get( store.getState(), key ),
		subscribe( listener ) {
			let previousState = get( store.getState(), key );
			const unsubscribe = store.subscribe( () => {
				const newState = get( store.getState(), key );
				if ( newState !== previousState ) {
					listener();
					previousState = newState;
				}
			} );

			return unsubscribe;
		},
	};
}
