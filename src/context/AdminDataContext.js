// import React, { createContext, useEffect, useReducer, useState } from "react";
// import axios from "axios";
// import { BASE_URL } from "../utils/config";

// const initial_state = {
//   category: [],
//   admin: localStorage.getItem("admin") !== undefined
//     ? JSON.parse(localStorage.getItem("admin"))
//     : null,
// };

// export const AdminDataContext = createContext(initial_state);

// const AuthAdminReducer = (state, action) => {
//   switch (action.type) {
//     case "LOGIN_START":
//       return {
//         admin: null,
//       };
//     case "LOGIN_SUCCESS":
//       return {
//         admin: action.payload,
//       };
//     case "LOGIN_FAILURE":
//       return {
//         admin: null,
//       }
//     case "LOGOUT":
//       return {
//         admin: null,
//       };
//     default:
//       return state;
//   }
// };

// export const AdminDataContextProvider = ({ children }) => {
//   const [resultAdmin, setResultAdmin] = useState({})
//   const [state, dispatch] = useReducer(AuthAdminReducer, initial_state);

//   useEffect(() => {
//     localStorage.setItem("admin", JSON.stringify(state.admin));
//     setResultAdmin(localStorage.getItem("admin") !== undefined
//     ? JSON.parse(localStorage.getItem("admin"))
//     : null)

//   }, [state.admin]);

//   console.log('update '+ resultAdmin)
  
//   function setLocalStorage() {
//     setResultAdmin("hello ca nha yeu")
//   }

//   return (
//     <AdminDataContext.Provider
//       value={{
//         resultAdmin: resultAdmin,
//         setLocalStorage: setLocalStorage,
//         admin: state.admin,
//         dispatch
//       }}
//     >
//       {children}
//     </AdminDataContext.Provider>
//   );
// };
