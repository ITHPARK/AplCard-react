import { COLLECTIONS } from '@constants'
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  updateDoc,
} from 'firebase/firestore'
import { store } from './firebase'
import { ApplyValues } from '@/models/apply'

export const applyCard = async (applyValues: ApplyValues) => {
  return addDoc(collection(store, COLLECTIONS.CARD_APPLY), applyValues) //addDOC함수로 store에 접근하여 데이터를 생성
}

export const updateApplyCard = async ({
  cardId,
  userId,
  applyValues,
}: {
  cardId: string
  userId: string
  applyValues: Partial<ApplyValues> // Partial = ApplyValues 일부만 업데이트 가능하게 설정
}) => {
  const snapshot = await getDocs(
    query(
      collection(store, COLLECTIONS.CARD_APPLY), //CARD_APPLY 컬렉션을 참조
      where('userId', '==', userId), //where문으로 userId와 cardId에 해당하는 문서를 필터링
      where('cardId', '==', cardId),
    ),
  )

  const [applied] = snapshot.docs //참조한 컬렉션에서 조건에 맞는 데이터들을 담은 배열
  updateDoc(applied.ref, applyValues) //원래 문서 applied.ref를 applyValues로 업데이트
}

export const getAppliedCard = async ({
  userId,
  cardId,
}: {
  userId: string
  cardId: string
}) => {
  const snapshot = await getDocs(
    query(
      collection(store, COLLECTIONS.CARD_APPLY),
      where('userId', '==', userId),
      where('cardId', '==', cardId),
    ),
  )

  if (snapshot.docs.length === 0) {
    //가져온 데이터가 없다면 null (신청하지 않은 상태)
    return null
  }

  const [applied] = snapshot.docs //데이터가 있을 때 값을 리턴
  return applied.data() as ApplyValues
}
