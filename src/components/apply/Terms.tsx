import React, { useCallback, useState, MouseEvent } from 'react'
import Agreement from '@shared/Agreement'
import { termsList } from '@constants/apply'
import FixedBottomButton from '@shared/FixedBottomButton'
import { ApplyValues } from '@/models/apply'

const Terms = ({
  onNext,
}: {
  onNext: (terms: ApplyValues['terms']) => void
}) => {
  const [termsAgreements, setTermsAgreements] = useState(() => {
    return termsList.reduce<Record<string, boolean>>(
      //약관 목록 체크가 되었는지 값을 추가
      (prev, term) => ({
        ...prev,
        [term.id]: false,
      }),
      {},
      /*
        {
            '01': false,
            '02': false
        }과 같은 값을 반환
       */
    )
  })

  const handleAllAgreements = useCallback(
    (_: MouseEvent<HTMLElement>, checked: boolean) => {
      setTermsAgreements((prevTerms) => {
        return Object.keys(prevTerms).reduce(
          //객체의 키값에 접근에 전체를 순회
          (prev, key) => ({
            ...prev,
            [key]: checked, //전체 키값을 checked 값으로 변경
          }),
          {},
        )
      })
    },
    [],
  )

  //모든 약관이 다 동의 되었는지 확인하는 함수
  const allAgreementChecked = Object.values(termsAgreements).every(
    (agree) => agree,
  ) //termsAgreements 객체를 순회해서 values에만 접근한다.

  return (
    <div>
      <Agreement>
        <Agreement.Title
          checked={allAgreementChecked}
          onChange={handleAllAgreements}
        >
          약관에 모두 동의
        </Agreement.Title>

        {/*개별약관 리스트업 */}
        {termsList.map(({ id, title, link }) => (
          <Agreement.Description
            key={id}
            link={link}
            checked={termsAgreements[id]}
            onChange={(_, checked) => {
              setTermsAgreements((prevTerms) => ({
                ...prevTerms, //체크 상태를 업데이트
                [id]: checked,
              }))
            }}
          >
            {title}
          </Agreement.Description>
        ))}
      </Agreement>
      <FixedBottomButton
        label="약관동의"
        disabled={allAgreementChecked === false}
        onClick={() => {
          onNext(Object.keys(termsAgreements)) //약관의 키값만 빼온다.
        }}
      />
    </div>
  )
}

export default Terms
