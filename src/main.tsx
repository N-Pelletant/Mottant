import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { MatrixProvider } from './context'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MatrixProvider>
      <App />
    </MatrixProvider>
  </React.StrictMode>
)
