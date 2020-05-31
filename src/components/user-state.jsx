import { useState, useEffect } from 'react';
import isJWTExpiredOrNull from './validate-jwt';

let listeners = [];
let state = { 
  isLoggedIn: !isJWTExpiredOrNull(localStorage.token)
 };

const setState = (newState) => {
  state = { ...state, ...newState };
  listeners.forEach((listener) => {
    listener(state);
  });
};

const useUserState = () => {
  const newListener = useState()[1];
  useEffect(() => {
    listeners.push(newListener);
  }, []);
  return [state, setState];
};

export default useUserState;