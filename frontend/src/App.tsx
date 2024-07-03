import Header from "./components/Header"
import Footer from "./components/Footer"
import { Container } from "react-bootstrap"
import { Outlet } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useEffect } from "react"
import { useAppDispatch } from "./hooks"
import { logout } from "./slices/authSlice"

const App = () => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    const expirationTime = JSON.parse(localStorage.getItem("expirationTime")!)
    if (expirationTime) {
      const currentTime = new Date().getTime()
      if (currentTime > expirationTime) {
        dispatch(logout())
      }
    }
  }, [dispatch])

  return (
    <>
      <ToastContainer />
      <Header />
      <main className="py-3">
        <Container>
          <Outlet />
        </Container>
      </main>
      <Footer />
    </>
  )
}

export default App
