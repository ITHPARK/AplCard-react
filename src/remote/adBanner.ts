import { collection, getDocs } from 'firebase/firestore' //getDocs는 전체 데이터를 가져올 수 있음
import { store } from './firebase'

import { COLLECTIONS } from '@constants' //Firestore의 컬렉션 이름

import { AdBanner } from '@models/card'

export const getAdBanners = async () => {
  // getDocs로 adBanner의 모든 정보를 가지고온다.
  const adBannerSnapshot = await getDocs(
    collection(store, COLLECTIONS.ADBANNER),
  )

  //doc는 기본적으로 ID와 문서 내용 data으로 구성되어 있기 때문에 데이터를 한번 더 가공
  return adBannerSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as AdBanner),
  }))
}
