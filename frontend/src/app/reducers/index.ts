import { combineReducers } from 'redux';
import { RootState } from './state';
import { DBTreeReducer } from './DBTree';
import { CachedTreeReducer } from './CachedTree';

export { RootState }; 

export const rootReducer = combineReducers({
  DBTree: DBTreeReducer,
  CachedTree: CachedTreeReducer
});
