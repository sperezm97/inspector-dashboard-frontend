import { createContext, useEffect, useReducer } from 'react';
import { authReducer } from './authReducer';

export const AuthContext = createContext({})

const Initial_State = {
  token: null,
  logged: false,
  user: null,
}

export var AuthProvider = function({ children }) {

  const [authState, dispatch] = useReducer(authReducer, Initial_State)

  useEffect(() => {
    dispatch({
      type: "authUser",
      payload: JSON.parse(localStorage.getItem('user'))
    })
  },[])

  const addAuthFN = (data) => {
    dispatch({
      type: "authUser",
      payload: data
    })

    localStorage.setItem("user", JSON.stringify(data));
  }

  return (
    <AuthContext.Provider
      value={{
        authState,
        addAuthFN
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
