# AplCard-React
React + Typescript 카드 신청 앱

<br/>

# 📃 프로젝트 소개
카드 혜택 정보를 제공하고 각 회원마다 카드를 신청할 수 있는 기능을 제공하는 사이트입니다.

<br/>

# ⚙️ 개발 환경
- `React 18`
- `Typescript`
- `React-Query`
- Style : `Emotion css`
- 상태관리 : `Recoil`
- DB 및 인증 : `firebase`
- Tool : `vscode`

<br/>

# ✔️ 주요 기능
<details>
	<summary>각 카드 정보제공 및 무한 스크롤 구현</summary>
   <br>
	
   firebase store에 저장된 데이터를 GET 요청으로 가져와 노출합니다. 
	
   <br>	
   <br>
	
   한번 호출당 10개의 데이터를 가져오며 스크롤이 일정 부분 내려갔을 때 다음 10개를 호출합니다.
	
   <br>	
  
   ![이미지1](https://github.com/user-attachments/assets/d7baa1fe-7930-4a1b-8661-1cc7d9f883be)

   firebase store CARD 컬렉션에 들어있는 데이터.

   <br>	

   ![이미지2](https://github.com/user-attachments/assets/64f90408-c1b3-4962-8d52-1cf0387f7da4)

   CARD 컬렉션에 접근하여 데이터를 10개씩 끊어서 가져옵니다. 인자로 받아온 pageParam을 통해서 get요청의 시작지점을 설정할 수 있습니다.

   <br>	

   ```js
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
   ```
<br>	

React-Query로 10개씩 데이터를 페칭하고 캐싱하며, useInfiniteQuery를 이용하여 일정 스크롤이 내려오면 다음 10개의 데이터를 불러옵니다.

<br>	

![구현1](https://github.com/user-attachments/assets/c1eb25f7-aeaa-4eaa-96fa-014861470cf6)

구현된 화면.
</details>

<details>
	<summary>로그인/회원가입 기능 구현</summary>
   <br>
	
   firebase auth를 활용하여 로그인 세션 처리와 회원가입 기능을 구현하였습니다.
	
   <br>	
   
   ![이미지3](https://github.com/user-attachments/assets/bab69a6f-9ace-4992-ba92-34c48db2d17f)

   form에 로그인 정보를 입력하면 validate 라이브러리를 활용하여 이메일 유효성과 패스워드 8자리 유효성 검사를 합니다.

   <br>	

   ```js
const Form = ({
  onSubmit,
}: {
  onSubmit: (fromValues: FormValuesProps) => void
}) => {
  const [formValues, setFormValues] = useState<FormValuesProps>({
    email: '',
    password: '',
  })

  //input들이 최초로 포커싱이 된적이 있는지의 상태를 관리하는 state
  const [dirty, setDirty] = useState<Partial<FormValuesProps>>({})

  //포커스가 떨어졌을 때 설정
  const handleBlur = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setDirty((prevDirty) => ({
      ...prevDirty,
      [e.target.name]: true,
    }))
  }, [])

  //input을 입력할 때 formValues state를 업데이트하는 함수
  const handleFormValues = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [e.target.name]: e.target.value,
    }))
  }, [])

  const errors = useMemo(() => validate(formValues), [formValues])

  const isSubmit = Object.keys(errors).length === 0

  return (
    <Flex direction="column" css={formContainerStyles}>
      <TextField
        label="이메일"
        name="email"
        placeholder="Example@example.com"
        onChange={handleFormValues}
        value={formValues.email}
        onBlur={handleBlur}
        hasError={Boolean(dirty.email) && Boolean(errors.email)} // 객체의 키값이 존재하는지 Boolean값으로 확인
        helpMessage={Boolean(dirty.email) ? errors.email : ''}
      />
      <Spacing size={16} />
      <TextField
        label="패스워드"
        name="password"
        type="password"
        onChange={handleFormValues}
        value={formValues.password}
        onBlur={handleBlur}
        hasError={Boolean(dirty.password) && Boolean(errors.password)}
        helpMessage={Boolean(dirty.password) ? errors.password : ''}
      />

      <Spacing size={16} />

      <Button
        size="medium"
        disabled={isSubmit === false}
        onClick={() => {
          onSubmit(formValues)
        }}
      >
        로그인
      </Button>
      <Spacing size={16} />

      <Link to="/signup" css={linkStyles}>
        <Text typography="t7">아직 계정이 없으신가요?</Text>
      </Link>
    </Flex>
  )
}

const formContainerStyles = css`
  padding: 24px;
`
//유효성 검사 함수
const validate = (formValues: FormValuesProps) => {
  let errors: Partial<FormValuesProps> = {}

  if (validator.isEmail(formValues.email) === false) {
    errors.email = '이메일 형식을 확인해주세요'
  }

  if (formValues.password.length < 8) {
    errors.password = '8자 이상의 비밀번호를 입력하세요'
  }

  return errors
}

const linkStyles = css`
  text-align: center;

  & > span:hover {
    color: ${colors.blue};
  }
`

export default Form
   ```
<br>	

각 from에 입력된 정보를 formValues state에 업데이트합니다. state 데이터를 통해서 firebase에서 제공하는 로그인 함수인 signInWithEmailAndPassword에 이메일과 패스워드를 전닳하여 로그인을 시도합니다.

<br>	

![구현2](https://github.com/user-attachments/assets/67801efa-fb3d-40fd-aebc-d0df6c45adfb)


구현된 화면.


   
   
</details>
 
  


