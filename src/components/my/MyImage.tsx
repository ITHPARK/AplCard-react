import React, { ChangeEvent } from 'react'
import useUser from '@hooks/auth/useUser'
import styled from '@emotion/styled'
import { getAuth, updateProfile } from 'firebase/auth'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { app, storage, store } from '@remote/firebase'
import { collection, doc, updateDoc } from 'firebase/firestore'
import { COLLECTIONS } from '@/constants'
import { userAtom } from '@atoms/user'
import { useSetRecoilState } from 'recoil'
import { auth } from '@remote/firebase'

//'default'는 클릭했을 때 마이페이지로 이동하는 것  'upload' 프로필 사진 업데이트
const MyImage = ({
  size = 40,
  mode = 'default',
}: {
  size?: number
  mode?: 'default' | 'upload'
}) => {
  const user = useUser()
  const setUser = useSetRecoilState(userAtom)

  const handleUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    //파일
    const files = e.target.files

    //현재 로그인된 유저정보
    const currentUser = getAuth(app).currentUser

    if (files == null || user == null || currentUser == null) {
      return
    }

    const fileName = files[0].name

    //저장할 폴더 경로명
    const storageRef = ref(storage, `user/${user.uid}/${fileName}`)

    //firebase storage에 파일을 업로드
    const upload = await uploadBytes(storageRef, files[0])

    //업로드된 정보를 가져온다.
    const downloadUrl = await getDownloadURL(upload.ref)

    //프로필 업데이트 firebase auth쪽만 업데이트 된다.
    await updateProfile(currentUser, {
      photoURL: downloadUrl,
    })

    //현재 로그인 된 정보로 store USER 컬렉션에 접근을해서 photoURL 값을 업데이트 한다.
    updateDoc(doc(collection(store, COLLECTIONS.USER), currentUser.uid), {
      photoURL: downloadUrl,
    })

    //리코일 저장소도 업데이트해준다.
    setUser({
      ...user,
      photoURL: downloadUrl,
    })
  }

  console.log(user)

  return (
    <Container>
      <img
        src={
          user?.photoURL ||
          'https://cdn1.iconfinder.com/data/icons/freeline/32/account_friend_human_man_member_person_profile_user_users-256.png'
        }
        alt="유저 이미지"
        width={size}
        height={size}
      />
      {mode === 'upload' && (
        <div>
          <input type="file" onChange={handleUpload} />
        </div>
      )}
    </Container>
  )
}

const Container = styled.div`
  position: relative;
  display: inline-block;
  cursor: pointer;

  & img {
    border-radius: 100%;
  }

  & input[type='file'] {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
  }
`

export default MyImage
