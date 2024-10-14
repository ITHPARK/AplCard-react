import { parse } from 'qs'

import Flex from '@shared/Flex'
import Text from '@shared/Text'
import FixedBottomButton from '@shared/FixedBottomButton'
import Spacing from '@shared/Spacing'

const ApplyDone = () => {
  const { success } = parse(window.location.search, {
    ignoreQueryPrefix: true,
  }) as { success: string }

  console.log(success)

  return (
    <Flex
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}
      justify="center"
      align="center"
    >
      <Text css={{ marginTop: '-80px' }}>
        {success === 'true' ? (
          <Flex direction="column" justify="center" align="center">
            <img
              src="https://cdn.pixabay.com/animation/2024/07/16/16/50/16-50-52-689_256.gif"
              alt="완료gif"
              style={{
                width: 200,
              }}
            />
            <Spacing size={18} />
            <Text typography="t4" bold={true}>
              카드 발급이 완료되었습니다!
            </Text>
          </Flex>
        ) : (
          <Flex direction="column" justify="center" align="center">
            <img
              src="https://cdn.pixabay.com/photo/2012/05/07/02/13/cancel-47588_1280.png"
              alt="실패 이미지"
              style={{
                width: 150,
              }}
            />
            <Spacing size={18} />
            <Text typography="t4" bold={true}>
              카드 발급에 실패했습니다.
            </Text>
          </Flex>
        )}
      </Text>

      <FixedBottomButton
        label="확인"
        onClick={() => {
          window.history.back()
        }}
      />
    </Flex>
  )
}

export default ApplyDone
