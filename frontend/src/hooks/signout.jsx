// import axios from "axios";
// import { useSnackbar } from 'notistack';
// const link = 'http://localhost:5500'


// export const handleSignOut = async () => {
//     const {enqueueSnackbar} = useSnackbar()

//     try {
//         await axios.post(`${link}/api/logout`);

//         localStorage.clear();
//         enqueueSnackbar('Log out successful', { variant: 'success' })
//         window.location.reload()
//         navigate('/');
//     } catch (error) {
//         console.error('Error signing out:', error);
//     }
// };