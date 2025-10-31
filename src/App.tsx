import { lazy } from "react"
import { Route, Routes } from "react-router"

const Home = lazy(() => import('./pages/Home'))
const Job = lazy(() => import('./pages/SingleJob'))
const NotFound = lazy(() => import('./pages/NotFound'))

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/job/:id" element={<Job />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
