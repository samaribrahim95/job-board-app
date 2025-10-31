import { lazy, Suspense } from "react"
import { Route, Routes } from "react-router"
import Loading from "./components/Loading"

const Home = lazy(() => import('./pages/Home'))
const Job = lazy(() => import('./pages/SingleJob'))
const NotFound = lazy(() => import('./pages/NotFound'))

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/job/:id" element={<Job />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  )
}

export default App
