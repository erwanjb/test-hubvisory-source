import { createStore, combineReducers } from 'redux';
import tokenReducer from './auth/reducers';
import activeReducer from './activeGameOver/reducers';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
};

const persistAuthConfig = {
  key: 'auth',
  storage,
};

const persistGameOverConfig = {
  key: 'gameover',
  storage,
};

const combinedReducers = combineReducers({
  auth: persistReducer(persistAuthConfig, tokenReducer),
  gameover: persistReducer(persistGameOverConfig, activeReducer),
});
const persistedReducer = persistReducer(persistConfig, combinedReducers);

export const store = createStore(persistedReducer);

export const persistor = persistStore(store);
