import {
  collection,
  getDocs,
  getDoc,
  QuerySnapshot,
  query,
  limit,
  startAfter,
  doc,
} from 'firebase/firestore' //getDocs는 전체 데이터를 가져올 수 있음
import { store } from './firebase'
import { COLLECTIONS } from '@constants'
import { Card } from '@models/card'

//infinityQuery로 10개씩 스크롤을 하기 위해서 어디까지 불러왔는지 저장하는 pageParams를 사용
export const getCards = async (pageParam?: QuerySnapshot<Card>) => {
  //card의 정보를 가지고온다.
  const cardQuery =
    pageParam == null //pageParam이 없다면 최초호출이므로 10개를 호출하고 pageParam이 있다면 이미 불러와진 다음 10개 요소를 호출한다.
      ? query(collection(store, COLLECTIONS.CARD), limit(10)) // limit은 10개씩 불러오게 설정
      : query(
          collection(store, COLLECTIONS.CARD),
          startAfter(pageParam),
          limit(10),
        )

  const cardSnapshot = await getDocs(cardQuery)

  const lastVisible = cardSnapshot.docs[cardSnapshot.docs.length - 1] //마지막 요소를 커서로 설정

  //데이터를 한번 더 가공
  const items = cardSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Card),
  }))

  return { items, lastVisible }
}

export const getCard = async (id: string) => {
  const snapshot = await getDoc(doc(store, COLLECTIONS.CARD, id))

  return {
    id,
    ...(snapshot.data() as Card),
  }
}
