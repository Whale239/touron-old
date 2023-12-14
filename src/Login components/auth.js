import { auth, firedb } from '../firebase';

export const storeAuthToken = (user) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('authToken', JSON.stringify(user));
  }
};

export const isAuthenticated = () => {
  if (typeof window == 'undefined') {
    return false;
  }
  if (localStorage.getItem('authToken')) {
    return JSON.parse(localStorage.getItem('authToken'));
  } else {
    return false;
  }
};

export const storeadmintoken = (adminToken) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('adminToken', JSON.stringify(adminToken));
  }
};
// export const isAdmin = (email) => {
//   const adminUsers = [
//     "vikashmanoharan@touron.in",
//     "manivasagam.shanmugam@touron.in",
//     "dineshkumar.devadasan@touron.in",
//     "samyuktha.v@touron.in",
//     "ganesh.ashok@touron.in",
//     "kirthika.jayagopi@touron.in",
//     "keerthivikash@touron.in",
//     "bharathwaaj.sathish@touron.in",
//     "swetha.suresh@touron.in",
//   ];

//   if (adminUsers.includes(email)) return true;
//   return false;
// };

export const signout = (next) => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('authToken');
    localStorage.removeItem('adminToken');
  }
  auth.signOut();
  next();
};

export const getUserData = (uid) => {
  firedb.ref(`userGeneralInfo/${uid}`).on('value', (data) => {
    if (data.val() !== null) {
      let val = data.val();
      if (val.admin === true) {
        storeadmintoken(val.admin);
      }
    }
  });
};
