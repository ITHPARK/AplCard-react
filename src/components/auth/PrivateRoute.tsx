import { Navigate } from 'react-router-dom'
import useUser from '@hooks/auth/useUser'

//로그인을 안하고 페이지에 접근하면 로그인 페이지로 리다이렉트 시킴
const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const user = useUser()

  //로그인 정보가 없으면 로그인 페이지로 이동
  if (user == null) {
    //replace를 true로 하면 뒤로가기 이동이 불가능
    return <Navigate to="/signin" replace={true} />
  }

  return <>{children}</>
}

export default PrivateRoute
