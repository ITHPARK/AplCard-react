import React, { ChangeEvent, useCallback, useState } from 'react'
import Select from '@shared/Select'
import { 연소득옵션, 신용점수옵션, 결제일옵션 } from '@constants/apply'
import { ApplyValues } from '@/models/apply'
import FixedBottomButton from '@shared/FixedBottomButton'

type InfoValues = Pick<ApplyValues, 'salary' | 'creditScore' | 'payDate'> //ApplyValues 타입에서  'salary' | 'creditScore' | 'payDate'값을 뽑아 쓰는 타입

const BasicInfo = ({
  onNext,
}: {
  onNext: (infoValues: InfoValues) => void
}) => {
  const [infoValues, setInfoValues] = useState<InfoValues>({
    //select 함수들
    salary: '',
    creditScore: '',
    payDate: '',
  })

  //option의 값이 바뀌었을 때 실행 infoValues 업데이트
  const handleInfoChange = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    setInfoValues((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }, [])

  //다 선택 되었는지 확인
  const allSelected = Object.values(infoValues).every((value) => value)

  return (
    <div>
      <Select
        name="salary"
        label="연소득"
        options={연소득옵션}
        placeholder={연소득옵션[0].label}
        value={infoValues.salary}
        onChange={handleInfoChange}
      />
      <Select
        name="creditScore"
        label="신용점수"
        options={신용점수옵션}
        placeholder={신용점수옵션[0].label}
        value={infoValues.creditScore}
        onChange={handleInfoChange}
      />
      <Select
        name="payDate"
        label="결제일"
        options={결제일옵션}
        placeholder={결제일옵션[0].label}
        value={infoValues.payDate}
        onChange={handleInfoChange}
      />
      <FixedBottomButton
        label="다음"
        disabled={allSelected === false}
        onClick={() => {
          onNext(infoValues) //이 컴포넌트에서 생성한 infoValues state의 데이터가 onNext 함수로 부모에게 데이터가 전달된다.
        }}
      />
    </div>
  )
}

export default BasicInfo
