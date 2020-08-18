import { ReducerFactory } from 'redux-actions-ts-reducer';
import { RootState } from 'app/reducers/state';
import { DBTreeActions, CachedTreeActions } from 'app/actions';

const initialState: RootState.DBTreeState = {
    tree: null,
    selectedNode: null,
    selectedPath: null,
    isFetching: false
};


export const DBTreeReducer = new ReducerFactory(initialState)
.addReducer(CachedTreeActions.applyTreeActionRequest, (state) => {
    return {
        ...state,
        isFetching: true
    };
  })
  .addReducer(CachedTreeActions.applyTreeActionSuccess, (state, action) => {
    if (action.payload) {
      return {
          ...state,
          tree: { ...action.payload },
          isFetching: false
      };
    }
    return state;
  })
  .addReducer(CachedTreeActions.applyTreeActionFailed, (state) => {

    setTimeout(() => window.alert('Error'), 0)

    return {
        ...state,
        isFetching: true
    };
  })
  .addReducer(DBTreeActions.resetTreeRequest, (state) => {
    return {
        ...state,
        isFetching: true
    };
  })
  .addReducer(DBTreeActions.resetTreeSuccess, (state, action) => {
    if (action.payload) {
      return {
          ...state,
          tree: { ...action.payload },
          isFetching: false
      };
    }
    return state;
  })
  .addReducer(DBTreeActions.resetTreeFailed, (state) => {

    setTimeout(() => window.alert('Error'), 0)

    return {
        ...state,
        isFetching: true
    };
  })
  .addReducer(DBTreeActions.getDBTreeRequest, (state) => {
    return {
      ...state,
      isFetching: true
    };
  })
  .addReducer(DBTreeActions.getDBTreeSuccess, (state, action) => {
    if (action.payload) {
      return {
          ...state,
          tree: { ...action.payload },
          isFetching: false
      };
    }
    return state;
  })
  .addReducer(DBTreeActions.getDBTreeFailed, (state) => {
    return {
      ...state,
      isFetching: false
    };
  })
  .addReducer(DBTreeActions.selectNodeAction, (state, action) => {
    if (action.payload) {
      return {
          ...state,
            selectedNode: { ...action.payload.node },
            selectedPath: { ...action.payload.path}
      };
    }
    return state;
  })
  .toReducer()