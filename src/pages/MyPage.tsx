import React, { useCallback } from 'react'
import Flex from '@shared/Flex'
import Text from '@shared/Text'
import useUser from '@hooks/auth/useUser'
import Button from '@shared/Button'
import { signOut } from 'firebase/auth'
import { auth } from '@remote/firebase'
import MyImage from '@/components/my/MyImage'
import Spacing from '@shared/Spacing'

const MyPage = () => {
  const user = useUser()

  const handleLogOut = useCallback(() => {
    signOut(auth)
      .then(() => {
        alert('로그아웃 되었습니다.')
      })
      .catch(() => {
        console.log('로그아웃 실패')
      })
  }, [])

  return (
    <Flex direction="column" align="center">
      <Spacing size={40} />
      <MyImage mode="upload" />
      <Spacing size={20} />
      <Text bold={true}>{user?.displayName}</Text>
      <Spacing size={20} />
      <Button onClick={handleLogOut}>로그아웃</Button>
    </Flex>
  )
}

export default MyPage
