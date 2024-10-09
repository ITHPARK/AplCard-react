import { useMutation } from 'react-query'
import { applyCard } from '@remote/apply'
import { ApplyValues } from '@models/apply'
import { useAlertContext } from '@/context/AlertContext'

interface UseMutationseApplyCardMutationProps {
  onSuccess: () => void
  onError: () => void
}

const useApplyCardMutation = ({
  onSuccess,
  onError,
}: UseMutationseApplyCardMutationProps) => {
  const { open } = useAlertContext()

  return useMutation((applyValues: ApplyValues) => applyCard(applyValues), {
    //applyValues를 받아서  applyCard로 api 호출
    onSuccess: () => {
      //api 호출이 성공했을 때 실행
      onSuccess()
    },
    onError: () => {
      //api 호출이 실패했을 때 실행
      open({
        //알럿 생성
        title: '카드를 신청하지 못했어요. 나중에 다시 시도해주세요.',
        onButtonClick: () => {
          onError()
        },
      })
      onError()
    },
  })
}

export default useApplyCardMutation
