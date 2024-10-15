import { useCallback } from 'react'
import ListRow from '@shared/ListRow'
import { useInfiniteQuery } from 'react-query'
import { getCards } from '@/remote/cards'
import flatten from 'lodash.flatten'
import InfiniteScroll from 'react-infinite-scroll-component'
import Badge from '@shared/Badge'
import { useNavigate } from 'react-router-dom'

const CardList = () => {
  const {
    data,
    hasNextPage = false,
    fetchNextPage,
    isFetching,
  } = useInfiniteQuery(
    ['cards'],
    ({ pageParam }) => {
      return getCards(pageParam) // 카드 데이터를 가져온다.
    },
    {
      getNextPageParam: (snapshot) => {
        return snapshot.lastVisible //맨 마지막 요소 리턴. 이는 pageParam으로 들어간다.
      },
      suspense: true,
    },
  )

  const navigate = useNavigate()

  //page안에 배열 데이터만 가지고 오기
  const cards = flatten(data?.pages.map(({ items }) => items))

  const loadMore = useCallback(() => {
    if (hasNextPage === false || isFetching) {
      //page가 로딩중이거나 다음 페이지가 없으면 그냥 리턴
      return
    }

    fetchNextPage() //다음 페이지 로딩
  }, [fetchNextPage, hasNextPage, isFetching])

  if (data == null) {
    return null
  }

  return (
    <div>
      <InfiniteScroll
        dataLength={cards.length}
        hasMore={hasNextPage}
        loader={<ListRow.Skeleton />}
        next={loadMore}
        scrollThreshold="50px"
        scrollableTarget="App-Wrap"
      >
        <ul>
          {cards?.map((card, index) => {
            return (
              <ListRow
                // left={<div>left</div>}
                contents={
                  <ListRow.Texts
                    title={`${index + 1}위`}
                    subTitle={card.name}
                  />
                }
                right={
                  card.payback != null ? (
                    <Badge label={card.payback}></Badge>
                  ) : null
                }
                withArrow={true}
                key={card.id}
                onClick={() => {
                  navigate(`/card/${card.id}`)
                }}
              />
            )
          })}
        </ul>
      </InfiniteScroll>
    </div>
  )
}

export default CardList
