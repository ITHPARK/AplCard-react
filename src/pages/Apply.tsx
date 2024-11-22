import { useState } from 'react'
import Apply from '@components/apply'
import useApplyCardMutation from '@/components/apply/hooks/useApplyCardMutation'
import usePollApplyStatus from '@components/apply/hooks/usePollApplyStatus'
import useAppliedCard from '@components/apply/hooks/useAppliedCard'
import useUser from '@hooks/auth/useUser'
import { useAlertContext } from '@/context/AlertContext'
import { updateApplyCard } from '@remote/apply'
import { useParams } from 'react-router-dom'
import { APPLY_STATUS } from '@/models/apply'
import { useNavigate } from 'react-router-dom'
import FullPageLoader from '@shared/FullPageLoader'

//카드신청 진행 메세지
const STAUTS_MESSAGE = {
  [APPLY_STATUS.READY]: '카드 심사를 준비하고 있습니다.',
  [APPLY_STATUS.PROGRESS]: '카드를 심사중입니다. 잠시만 기다려주세요.',
  [APPLY_STATUS.COMPLETE]: '카드 신청이 완료되었습니다.',
}

const ApplyPage = () => {
  const [readyToPoll, setReadyToPoll] = useState(false)
  const user = useUser()
  const { id } = useParams() as { id: string }
  const navigate = useNavigate()
  const { open } = useAlertContext()
  const storageKey = `applied-${user?.uid}-${id}`

  const { data } = useAppliedCard({
    userId: user?.uid as string,
    cardId: id,
    options: {
      onSuccess: (applied) => {
        //applied는 useQuery로 가져온 데이터

        //가져온 데이터가 없다면 그냥 리턴
        if (applied == null) {
          return
        }

        //데이터의 status에 완료상태로 되어있으면 alert 노출
        if (applied.status === APPLY_STATUS.COMPLETE) {
          open({
            title: '이미 발급이 완료된 카드입니다.',
            onButtonClick: () => {
              localStorage.removeItem(storageKey)
              window.history.back()
            },
          })

          return
        }

        //신청 정보는 있지만 완료 케이스는 없는 상태 (COMPLETE가 아닌 상태)
        setReadyToPoll(true)
      },
      onError: () => {},
      suspense: true, //suspense로 ApplyPage를 감싸고 fallback으로 데이터를 불러올 때 까지 fallback에 들어간 컴포넌트를 보여준다. 데이터가 이미 로드된 상태라면 data를 사용할 수 있다.
    },
  })

  const { data: status } = usePollApplyStatus({
    onSuccess: async () => {
      await updateApplyCard({
        userId: user?.uid as string,
        cardId: id,
        applyValues: { status: APPLY_STATUS.COMPLETE },
      })

      navigate('/apply/done?success=true', {
        replace: true,
      })
    },
    onError: async () => {
      await updateApplyCard({
        userId: user?.uid as string,
        cardId: id,
        applyValues: { status: APPLY_STATUS.REJECT },
      })

      navigate('/apply/done?success=false', {
        replace: true,
      })
    },
    enabled: readyToPoll,
  })

  //마직막 단계에서 다음을 눌렀을 때 넘어가는 신청단계
  const { mutate, isLoading: isApplying } = useApplyCardMutation({
    onSuccess: () => {
      //신청이 성공했을 때
      setReadyToPoll(true)
    },
    onError: () => {
      //신청이 실패 했을 때
      window.history.back() //다시 상세페이지로 이동
    },
  })

  //데이터가 있고 신청상태가 완료상태면 알럿만 노출하고 null을 출력
  if (data != null && data.status === APPLY_STATUS.COMPLETE) {
    return null
  }

  if (readyToPoll || isApplying) {
    return <FullPageLoader message={STAUTS_MESSAGE[status ?? 'READY']} />
  }

  return <Apply onSubmit={mutate}></Apply>
}

export default ApplyPage
