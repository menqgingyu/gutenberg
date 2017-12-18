/**
 * WordPress Dependencies
 */
import { registerReducer } from '@wordpress/data';

/**
 * Internal dependencies
 */
import { PREFERENCES_DEFAULTS } from './defaults';
import reducer from './reducer';
import { withRehydratation, loadAndPersist } from './persist';
import enhanceWithBrowserSize from './browser';
import applyMiddlewares from './middlewares';

/**
 * Module Constants
 */
const STORAGE_KEY = `GUTENBERG_PREFERENCES_${ window.userSettings.uid }`;

let store = registerReducer( 'core/editor', withRehydratation( reducer, 'preferences' ) );
store = applyMiddlewares( store );
loadAndPersist( store, 'preferences', STORAGE_KEY, PREFERENCES_DEFAULTS );
enhanceWithBrowserSize( store );

export default store;
