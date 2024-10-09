import React from 'react'
import Button from '@shared/Button'
import { adBanners } from '@/mock/data'
import { collection, doc, writeBatch } from 'firebase/firestore'
import { store } from '@remote/firebase'
import { COLLECTIONS } from '@/constants'

const AdBannerListAddButton = () => {
  const handleButtonClick = async () => {
    const batch = writeBatch(store)

    adBanners.forEach((banner) => {
      //배너 데이터에 접근
      const docRef = doc(collection(store, COLLECTIONS.ADBANNER))

      //배너 데이터를 저장
      batch.set(docRef, banner)
    })

    await batch.commit()

    alert('배너 리스트 추가 완료')
  }
  return <Button onClick={handleButtonClick}>배너 리스트 추가하기</Button>
}

export default AdBannerListAddButton
