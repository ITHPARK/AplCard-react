import {
  createContext,
  ComponentProps,
  useState,
  useCallback,
  useMemo,
  useContext,
} from 'react'
import { createPortal } from 'react-dom'

import Alert from '@shared/Alert'

type AlertProps = ComponentProps<typeof Alert> //Alert의 타입을 가져온다.
type AlertOptions = Omit<AlertProps, 'open'> //AlertProps에서 open타입을 제거한것

interface AlertContextValue {
  open: (options: AlertOptions) => void //확인 버튼을 누르면 사라지기 때문에 open만 넣어준다.
}

const Context = createContext<AlertContextValue | undefined>(undefined) //context생성

//Alert의 기본 옵션
const defaultValues: AlertProps = {
  open: false,
  title: null,
  description: null,
  onButtonClick: () => {},
}

//context를 사용한다는것은 항상 alert을 가지고 있는것이고, open함수를 이용해서 출력하는것
export const AlerContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [alertState, setAlertState] = useState(defaultValues)

  const $portal_root = document.getElementById('root-portal')

  const close = useCallback(() => {
    setAlertState(defaultValues) //Alert를 기본값으로 되돌리기
  }, [])

  const open = useCallback(
    ({ onButtonClick, ...options }: AlertOptions) => {
      setAlertState({
        ...options,
        onButtonClick: () => {
          close()
          onButtonClick()
        },
        open: true,
      })
    },
    [close],
  )

  const values = useMemo(() => ({ open }), [open]) //open이 바뀔때까지는 값 저장

  return (
    <Context.Provider value={values}>
      {children}
      {$portal_root != null
        ? createPortal(<Alert {...alertState} />, $portal_root) //root-portal이 있다면 portal을 생성 Alert을 가지고 있는다.
        : null}
    </Context.Provider>
  )
}

export const useAlertContext = () => {
  const values = useContext(Context)

  if (values == null) {
    throw new Error('AlertContext 내부에서 사용해주세요')
  }

  return values
}
