import React, { useContext } from 'react';
import { Route, Navigate } from 'react-router-dom';
import { ApiContext } from '../Context/ApiContext';
import LoaderAni from '../LoaderAnimation/LoaderAni';

const AdminRoute = ({ children }) => {
  const { employees } = useContext(ApiContext);
  const isAdmin = (email) => {
    const loggedUser = employees?.filter((e) => e.email === email);
    if (loggedUser.length === 0) return false;
    return loggedUser[0].isAdmin;
  };
  const isAdminUser = () => {
    const authToken = localStorage.getItem('authToken');
    if (authToken === null) {
      return false;
    } else {
      return isAdmin(JSON.parse(authToken).user.email);
    }
  };
  if (employees.length === 0) {
    return <LoaderAni />;
  } else {
    const auth = isAdminUser();
    return auth ? children : <Navigate to='/access-denied' />;
  }
};

export default AdminRoute;

// if (employees.length === 0) {
//   return <LoaderAni />;
// }
//   return (
//     <Route
//       {...rest}
//       render={(props) =>
//         isAdminUser() ? (
//           <Component {...props} />
//         ) : (
//           <Redirect
//             to={{
//               pathname: '/adminlogin',
//               state: {
//                 from: props.location,
//               },
//             }}
//           />
//         )
//       }
//     />
//   );
// };
