import { combineReducers } from 'redux';
import { RootState } from './state';
import { treeDbReducer } from './treeDb';
import { treeCacheReducer } from './treeCache';

export { RootState };

export const rootReducer = combineReducers<RootState>({
  treeDb: treeDbReducer,
  treeCache: treeCacheReducer
});
