import {BrowserRouter, Route, Routes} from "react-router-dom";

function App() {
  return (
      <BrowserRouter>
          <Routes>
              <Route path='/' element={'hello world'}/>
          </Routes>
      </BrowserRouter>
  )
}

export default App
