import { useQuery, UseQueryOptions } from 'react-query'
import { getAppliedCard } from '@remote/apply'
import { ApplyValues } from '@models/apply'

//
const useAppliedCard = ({
  userId,
  cardId,
  options,
}: {
  userId: string
  cardId: string
  options?: Pick<
    UseQueryOptions<ApplyValues | null>, //useQuery로 데이터를 가져왔을 때의 데이터 타입 지정
    'onSuccess' | 'onError' | 'suspense'
  >
}) => {
  return useQuery(
    ['applied', userId, cardId], //applied라는 키값으로  userId, cardId를 캐싱
    () => getAppliedCard({ userId, cardId }),
    options, //데이터 로딩 결과에 따라서 리액트 쿼리에서 지원하는 onSuccess, onError, suspense 사용을 지원 부모 컴포넌트에서 내려준 함수로 실행
  )
}

export default useAppliedCard
