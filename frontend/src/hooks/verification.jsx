import { useEffect, useState } from 'react';

export const useIsLoggedIn = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if the access token is present in local storage
    const accessToken = localStorage.getItem('accessToken');

    // Update the state based on whether the access token is present
    setIsLoggedIn(!!accessToken);
  }, []);

  return isLoggedIn;
};
