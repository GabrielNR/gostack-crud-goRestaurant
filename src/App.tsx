import { BrowserRouter } from 'react-router-dom'
import { Router } from "./routes";
import GlobalStyle from './styles/global';

export function App() {

  return (
    <>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
      <GlobalStyle />
    </>
  )
}

