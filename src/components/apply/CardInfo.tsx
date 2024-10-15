import { useState, MouseEvent, useCallback } from 'react'
import Button from '@shared/Button'
import Spacing from '@shared/Spacing'
import { ApplyValues } from '@/models/apply'
import FixedBottomButton from '@shared/FixedBottomButton'
import ApplyContainer from '@shared/ApplyContainer'

type CardInfoValue = Pick<ApplyValues, 'isHipass' | 'isMaster' | 'isRf'> //ApplyValues 타입에서 'isHipass' | 'isMaster' | 'isRf' 만 가져온다.

const CardInfo = ({
  onNext,
}: {
  onNext: (cardInfoValues: CardInfoValue) => void
}) => {
  const [cardInfoValues, setCardInfoValues] = useState<CardInfoValue>({
    isMaster: false,
    isRf: false,
    isHipass: false,
  })

  const { isMaster, isHipass, isRf } = cardInfoValues

  const handleButtonClick = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    const $button = e.target as HTMLButtonElement //지금 클릭한 버튼

    setCardInfoValues((prev) => ({
      ...prev,
      [$button.name]: JSON.parse($button.dataset.value as string), // string 타입인 $button.dataset.value를 boolean 타입으로 바꿔줘야함
    }))
  }, [])

  return (
    <ApplyContainer>
      <Button.Group title="해외결제">
        <Button
          name="isMaster"
          transparent={isMaster === false}
          size="medium"
          data-value={true}
          onClick={handleButtonClick}
        >
          Master
        </Button>
        <Button
          name="isMaster"
          transparent={isMaster === true}
          size="medium"
          data-value={false}
          onClick={handleButtonClick}
        >
          국내전용
        </Button>
      </Button.Group>
      <Spacing size={12} />
      <Button.Group title="후불교통">
        <Button
          name="isRf"
          transparent={isRf === true}
          size="medium"
          data-value={false}
          onClick={handleButtonClick}
        >
          신청안함
        </Button>
        <Button
          name="isRf"
          transparent={isRf === false}
          size="medium"
          data-value={true}
          onClick={handleButtonClick}
        >
          신청
        </Button>
      </Button.Group>
      <Spacing size={12} />
      <Button.Group title="후불하이패스카드">
        <Button
          name="isHipass"
          transparent={isHipass === true}
          size="medium"
          data-value={false}
          onClick={handleButtonClick}
        >
          신청안함
        </Button>
        <Button
          name="isHipass"
          transparent={isHipass === false}
          size="medium"
          data-value={true}
          onClick={handleButtonClick}
        >
          신청
        </Button>
      </Button.Group>

      <FixedBottomButton
        label="다음"
        onClick={() => {
          onNext(cardInfoValues)
        }}
      />
    </ApplyContainer>
  )
}

export default CardInfo
