import { Suspense } from 'react'
import Top from '@shared/Top'
import AdBanner from '@components/home/AdBanner'
import CardList from '@components/home/CardList'
import ListRow from '@shared/ListRow'

const Home = () => {
  return (
    <div>
      <Top
        title="혜택 좋은 카드"
        subTitle="회원님을 위해서 혜택 좋은 카드"
      ></Top>

      <AdBanner />

      <Suspense
        fallback={[...new Array(10)].map((_, index) => (
          <ListRow.Skeleton key={index} />
        ))}
      >
        <CardList />
      </Suspense>
    </div>
  )
}

export default Home
