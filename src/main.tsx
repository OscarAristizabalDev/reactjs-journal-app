import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'

import './styles.css'
import { JournalApp } from './JournalApp'
import { BrowserRouter } from 'react-router-dom'
import { store } from './store'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    {/* Provee el store a toso los componentes hijos */}
    <Provider store={store}> 
      <BrowserRouter>
        <JournalApp />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
)
