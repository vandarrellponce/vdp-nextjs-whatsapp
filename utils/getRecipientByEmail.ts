import { useCollection } from 'react-firebase-hooks/firestore'
import { db } from '../firebase'

const getRecipientByEmail = (recipientEmail) => {
  const [recipientSnapshot] = useCollection(
    db.collection('users').where('email', '==', recipientEmail)
  )
  return recipientSnapshot?.docs?.[0]?.data()
}

export default getRecipientByEmail
