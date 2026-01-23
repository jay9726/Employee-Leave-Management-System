import React from 'react'
import Router from './router'
import { AuthProvider } from './store/authStore'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Provider } from "react-redux";
import { store } from './redux/store';


const App: React.FC = () => {

  const client = new QueryClient();

  return (
    <QueryClientProvider client={client}>
      <Provider store={store}>
        <AuthProvider>
          <Router />
        </AuthProvider>
      </Provider>
    </QueryClientProvider>
  )
}

export default App