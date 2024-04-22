import React from 'react';
import { useIsLoggedIn } from '../hooks/verification';

const MyComponent = () => {
  const { isLoggedIn, userId, accessToken } = useIsLoggedIn();

  // Render different content based on the user's authentication status
  return (
    <div>
      {isLoggedIn ? (
        <div>
          <p>User is logged in with ID: {userId}</p>
          <p>Access Token: {accessToken}</p>
        </div>
      ) : (
        <p>User is not logged in</p>
      )}
    </div>
  );
};

export default MyComponent;
