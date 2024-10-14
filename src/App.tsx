import { Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ScrollToTop from '@shared/ScrollToTop'
import Home from '@pages/Home'
import CardPage from '@pages/Card'
import SigninPage from '@pages/Signin'
import SignupPage from '@pages/Signup'
import Navbar from '@shared/Navbar'
import PrivateRoute from '@components/auth/PrivateRoute'
import ApplyPage from '@pages/Apply'
import ApplyDone from '@pages/ApplyDone'
import MyPage from '@/pages/MyPage'

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/card/:id" element={<CardPage />} />
        <Route path="/signin" element={<SigninPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route
          path="/apply/:id"
          element={
            <PrivateRoute>
              <Suspense fallback={<></>}>
                <ApplyPage />
              </Suspense>
            </PrivateRoute>
          }
        />
        <Route
          path="/apply/done"
          element={
            <PrivateRoute>
              <ApplyDone />
            </PrivateRoute>
          }
        />
        <Route
          path="/my"
          element={
            <PrivateRoute>
              <MyPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
