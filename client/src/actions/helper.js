export const tokenConfig = getState => {
  // get token from store
  const token = getState().auth.token;
  
  // Add token to header - check whether this will be needed 
  const config = {
    headers: {
      "Content-type": "application/json"
    }
  }

  // If token, add it to headers
  if(token) {
    config.headers['x-auth-token'] = token;
  }

  return config;
};
