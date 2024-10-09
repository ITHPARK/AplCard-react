import Top from '@shared/Top'
import AdBanner from '@components/home/AdBanner'
import CardList from '@components/home/CardList'

const Home = () => {
  return (
    <div>
      <Top
        title="혜택 좋은 카드"
        subTitle="회원님을 위해서 혜택 좋은 카드"
      ></Top>
      <AdBanner />
      <CardList />
    </div>
  )
}

export default Home
