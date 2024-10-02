import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {Provider} from 'react-redux'
import store from './Redux/Store.js'
import Test from './Test.jsx'
import { Map } from './index.jsx'

createRoot(document.getElementById('root')).render(
  // <StrictMode >
    <Provider store={store} >
      <App/>
      {/* <Test/>
     <Map/> */}
    </Provider>
    
  // </StrictMode>,
)
