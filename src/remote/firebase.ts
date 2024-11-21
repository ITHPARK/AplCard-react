import { getAnalytics } from 'firebase/analytics'
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth' // Firebase 인증 서비스를 사용하여 사용자 인증을 처리하기 위한 함수
import { getFirestore } from 'firebase/firestore' //Firebase Firestore 데이터베이스를 사용하기 위한 함수로, 실시간 데이터베이스 작업을 지원
import { getStorage } from 'firebase/storage'

const {
  REACT_APP_API_KEY,
  REACT_APP_AUTH_DOMAIN,
  REACT_APP_PROJECT_ID,
  REACT_APP_STORAGE_BUCKET,
  REACT_APP_MESSAGING_SENDER_ID,
  REACT_APP_APP_ID,
  REACT_APP_MEASUREMENT_ID,
} = process.env

console.log(
  REACT_APP_API_KEY,
  REACT_APP_AUTH_DOMAIN,
  REACT_APP_PROJECT_ID,
  REACT_APP_STORAGE_BUCKET,
  REACT_APP_MESSAGING_SENDER_ID,
  REACT_APP_APP_ID,
  REACT_APP_MEASUREMENT_ID,
)

const firebaseConfig = {
  apiKey: REACT_APP_API_KEY,
  authDomain: REACT_APP_AUTH_DOMAIN,
  projectId: REACT_APP_PROJECT_ID,
  storageBucket: REACT_APP_STORAGE_BUCKET,
  messagingSenderId: REACT_APP_MESSAGING_SENDER_ID,
  appId: REACT_APP_APP_ID,
  measurementId: REACT_APP_MEASUREMENT_ID,
}

export const app = initializeApp(firebaseConfig) //firebaseConfig 객체를 사용하여 Firebase 앱을 초기화.
export const analytics = getAnalytics(app) //Firebase Analytics를 초기화하고 사용 준비 상태로 만든다.
export const auth = getAuth(app) // Firebase 인증 서비스를 초기화하고 앱 내에서 사용 가능한 상태로 만든다.
export const store = getFirestore(app) //Firebase Firestore 데이터베이스를 초기화하고 사용할 수 있게 만든다.
export const storage = getStorage(app) //Firebase Storage를 초기화하고 사용할수 있게 만든다.
