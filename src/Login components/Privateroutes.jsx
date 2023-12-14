import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { isAuthenticated } from './auth';

function PrivateRoute({ children }) {
  const auth = isAuthenticated();
  return auth ? children : <Navigate to='/login' />;
}
export default PrivateRoute;

// const PrivateRoute = ({ component: Component, ...rest }) => {
//   return (
//     <Route
//       {...rest}
//       render={(props) =>
//         isAuthenticated() ? (
//           <Component {...props} />
//         ) : (
//           <Redirect
//             to={{
//               pathname: '/signup',
//               state: { from: props.location },
//             }}
//           />
//         )
//       }
//     />
//   );
// };
