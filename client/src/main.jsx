import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter as Router } from 'react-router-dom';
import { ShopContext } from './ShopContext.jsx';
import { GoogleOAuthProvider } from '@react-oauth/google';

createRoot(document.getElementById('root')).render(
   <StrictMode>
      <GoogleOAuthProvider clientId='976795715577-eu4u93vv5t29ch39lsbnm9icofnp4ont.apps.googleusercontent.com'>
         <Router>
            <ShopContext>
               <App />
            </ShopContext>
         </Router>
      </GoogleOAuthProvider>
   </StrictMode>
);
