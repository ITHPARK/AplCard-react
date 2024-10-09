import { useQuery } from 'react-query'
import { APPLY_STATUS } from '@models/apply'

interface usePollApplyStatusProps {
  onSuccess: () => void //데이터 가져오기를 성공했을 때
  onError: () => void //데이터 가져오기를 실패 했을 때
  enabled: boolean
}

//카드 발급 상태를 주기적으로 갱신하는 훅
const usePollApplyStatus = ({
  onSuccess, //발급이 성공했을 때 실행
  onError, //발급이 실패했을 때 실행
  enabled, //훅을 활성화 할지 여부 제어
}: usePollApplyStatusProps) => {
  return useQuery(['applyStatus'], () => getApplyStatus(), {
    enabled,
    refetchInterval: 2_000, //2초마다 다시 데이터 호출
    staleTime: 0, //캐싱하지 않음
    onSuccess: (status) => {
      console.log('status', status)
      if (status === APPLY_STATUS.COMPLETE) {
        //COMPLETE일 때 onSuccess 실행
        onSuccess()
      }
    },
    onError: () => {
      //에러가 나면 실행
      onError()
    },
  })
}

//임의의 상태를 반환하는 것 (실제 서버에서 데이터를 가져오지 않는다.)
const getApplyStatus = () => {
  const values = [
    APPLY_STATUS.READY,
    APPLY_STATUS.PROGRESS,
    APPLY_STATUS.COMPLETE,
    APPLY_STATUS.REJECT,
  ]

  const status = values[Math.floor(Math.random() * values.length)]

  //에러처리
  if (status === APPLY_STATUS.REJECT) {
    //REJECT 상태일 때는 실패
    throw new Error('카드 발급에 실패했습니다.')
  }

  return status
}

export default usePollApplyStatus
