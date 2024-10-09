import Flex from './Flex'
import Text from './Text'
import Spacing from './Spacing'

const FullPageLoader = ({ message }: { message?: string }) => {
  return (
    <Flex
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}
      justify="center"
      align="center"
    >
      <Flex direction="column" align="center">
        <img
          src="https://cdn.pixabay.com/animation/2023/06/13/15/12/15-12-47-323_512.gif"
          alt="로켓 gif"
          style={{
            width: 150,
          }}
        />

        {message != null ? (
          <>
            <Spacing size={120}></Spacing>
            <Text bold={true} typography="t4">
              {message}
            </Text>
          </>
        ) : null}
      </Flex>
    </Flex>
  )
}

export default FullPageLoader
