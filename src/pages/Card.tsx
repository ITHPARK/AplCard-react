import { useParams, useNavigate } from 'react-router-dom'
import { useQuery } from 'react-query'
import { getCard } from '@remote/cards'
import Top from '@shared/Top'
import ListRow from '@shared/ListRow'
import Text from '@shared/Text'
import Flex from '@shared/Flex'
import FixedBottomButton from '@shared/FixedBottomButton'
import { css } from '@emotion/react'
import { motion } from 'framer-motion'
import useUser from '@hooks/auth/useUser'
import { useCallback } from 'react'
import { useAlertContext } from '@/context/AlertContext'

const CardPage = () => {
  //page url에서 id 값을 가져온다. id값을 없을 수도 있으니 초기값을 빈값으로 정해준다.
  const { id = '' } = useParams()

  //id값을 정해줄 때 키 값에 id값도 추가해서 캐시 값을 정해준다.
  const { data } = useQuery(['card', id], () => getCard(id), {
    enabled: id !== '', //id가 없을 때는 호출을 하는것이 무의미하므로 enabled 설정으로 fetching을 안한다.
  })

  //alert창을 띄우기 위한 함수
  const { open } = useAlertContext()

  //navigate를 위한 함수
  const navigate = useNavigate()

  //유저 정보
  const user = useUser()

  const moveToApply: () => void = useCallback(() => {
    if (user == null) {
      // 로그인 상태가 아니면 로그인 페이지로 이동
      open({
        title: '로그인이 필요합니다.',
        onButtonClick: () => navigate(`/signin`),
      })
      return
    }
    navigate(`/apply/${id}`)
  }, [id, navigate, open, user])

  if (data == null) {
    return null
  }

  const { name, corpName, promotion, tags, benefit } = data

  const subTitle =
    promotion != null ? removeHtmlTags(promotion.title) : tags.join(', ')

  return (
    <div>
      <Top title={`${corpName} ${name}`} subTitle={subTitle}></Top>

      <ul>
        {benefit.map((text, index) => {
          return (
            <motion.li
              initial={{
                opacity: 0,
                translateX: -90,
              }}
              // whileInView={{
              //   //view에서 벗어나면 다시 애니메이트
              //   opacity: 1,
              //   translateX: 0,
              // }}
              transition={{
                duration: 0.5,
                ease: [0.25, 0.1, 0.25, 0.1],
                delay: index * 0.05,
              }}
              animate={{
                opacity: 1,
                translateX: 0,
              }}
              key={text}
            >
              <ListRow
                as="div"
                left={<IconCheck />}
                contents={
                  <ListRow.Texts title={`혜택 ${index + 1}`} subTitle={text} />
                }
              />
            </motion.li>
          )
        })}
      </ul>

      {promotion != null ? (
        <Flex direction="column" gap="10px" css={termsContainerStyles}>
          <Text bold={true}>유의사항</Text>
          {/* promotion에 terms가 존재하는지에 따라 terms 또는 title 노출 */}
          {promotion.terms != null ? (
            <Text typography="t7">{removeHtmlTags(promotion.terms)}</Text>
          ) : (
            <Text typography="t7">{removeHtmlTags(promotion.title)}</Text>
          )}
        </Flex>
      ) : null}

      <FixedBottomButton
        label="1분만에 신청하고 혜택받기"
        onClick={moveToApply}
      />
    </div>
  )
}

//문자열에서 html 태그를 없애는 함수
function removeHtmlTags(text: string) {
  if (text == null) {
    return ''
  }

  return text.replace(/<\/?[^>]+(>|$)/g, '')
}

//아이콘 컴포넌트
const IconCheck = () => {
  return (
    <svg
      fill="none"
      height="20"
      viewBox="0 0 48 48"
      width="20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect fill="white" fill-opacity="0.01" height="48" width="48" />
      <path
        d="M24 44C29.5228 44 34.5228 41.7614 38.1421 38.1421C41.7614 34.5228 44 29.5228 44 24C44 18.4772 41.7614 13.4772 38.1421 9.85786C34.5228 6.23858 29.5228 4 24 4C18.4772 4 13.4772 6.23858 9.85786 9.85786C6.23858 13.4772 4 18.4772 4 24C4 29.5228 6.23858 34.5228 9.85786 38.1421C13.4772 41.7614 18.4772 44 24 44Z"
        fill="#1a237e"
        stroke="black"
        stroke-linejoin="round"
        stroke-width="4"
      />
      <path
        d="M16 24L22 30L34 18"
        stroke="white"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="4"
      />
    </svg>
  )
}

const termsContainerStyles = css`
  margin-top: 80px;
  padding: 0 24px 80px 24px;
`

export default CardPage
