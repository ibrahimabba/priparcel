import {
  TypedUseSelectorHook,
  useDispatch as dispatch,
  useSelector as selector,
} from 'react-redux';
import type {RootState, AppDispatch} from '../store/store';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useDispatch = () => dispatch<AppDispatch>();
export const useSelector: TypedUseSelectorHook<RootState> = selector;
