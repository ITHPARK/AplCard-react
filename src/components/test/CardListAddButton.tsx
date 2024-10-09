import React from 'react'
import Button from '@shared/Button'
import { card_list } from '@/mock/data'
import { collection, doc, writeBatch } from 'firebase/firestore'
import { store } from '@remote/firebase'
import { COLLECTIONS } from '@/constants'

const CardListAddButton = () => {
  const handleButtonClick = async () => {
    const batch = writeBatch(store)

    card_list.forEach((card) => {
      //collection 함수로 데이터에 접근 후 doc 함수로 고유 ID를 추가한다.
      const docRef = doc(collection(store, COLLECTIONS.CARD))

      //고유한 ID까지 추가해서 데이터를 다시 저장
      batch.set(docRef, card)
    })

    //batch 작업을 최종으로 적용하는 함수
    await batch.commit()

    alert('카드 리스트 추가 완료')
  }
  return <Button onClick={handleButtonClick}>카드 리스트 추가하기</Button>
}

export default CardListAddButton
