const BASE_URL = import.meta.env.VITE_API_URL;


// export const fetchClient = async (endpoint, options = {}) => {
//     const headers = {
//       'Content-Type': 'application/json',
//       ...options.headers,
//     };
  
//     // Attach Authorization token if available
//     const token = localStorage.getItem('authToken');
//     if (token) {
//       headers.Authorization = `Bearer ${token}`;
//     }
  
//     const response = await fetch(`${BASE_URL}${endpoint}`, {
//       ...options,
//       headers,
//     });
  
//     if (!response.ok) {
//       throw new Error(`Error: ${response.status} ${response.statusText}`);
//     }
  
//     return response.json();
//   };

export const fetchClient = async (endpoint, options = {}) => {
    const headers = {
      ...options.headers,
    };
  
    // Skip setting Content-Type if the body is FormData
    if (!(options.body instanceof FormData)) {
      headers['Content-Type'] = 'application/json';
    }
  
    // Attach Authorization token if available
    const token = localStorage.getItem('token');
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
  
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });
  
    // if (!response.ok) {
    //   throw new Error(`Error: ${response.status} ${response.statusText}`);
    // }
  
    return response.json();
  };