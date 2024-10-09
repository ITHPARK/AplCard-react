import React from 'react'
import { useQuery } from 'react-query'
import Skeleton from '@shared/Skeleton'
import Spacing from '@shared/Spacing'

const Review = () => {
  const { data = [], isLoading } = useQuery(['review'], () => {
    return new Promise<string[]>((resolve) => {
      setTimeout(() => {
        resolve(['test123123', 'test456456456'])
      }, 2_000)
    })
  })
  return (
    <div>
      {isLoading ? (
        <>
          <Skeleton width={30} height={10}></Skeleton>
          <Spacing size={3}></Spacing>
          <Skeleton width={30} height={10}></Skeleton>
        </>
      ) : (
        data.map((review) => <div>{review}</div>)
      )}
    </div>
  )
}

export default Review
