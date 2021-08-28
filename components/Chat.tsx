import { Avatar } from '@material-ui/core'
import { useRouter } from 'next/dist/client/router'
import { useCollection } from 'react-firebase-hooks/firestore'
import styled from 'styled-components'
import { db } from '../firebase'
import getRecipientByEmail from '../utils/getRecipientByEmail'
import getRecipientEmail from '../utils/getRecipientEmail'

const Chat: React.FC<{
  recipientEmail: string
  id: string
}> = ({ recipientEmail, id }) => {
  const router = useRouter()

  const recipient = getRecipientByEmail(recipientEmail)
  const enterChat = () => {
    router.push(`/chats/${id}`)
  }

  return (
    <Container onClick={enterChat}>
      {recipient ? (
        <UserAvatar src={recipient.photoURL} />
      ) : (
        <UserAvatar> {recipientEmail[0]}</UserAvatar>
      )}
      <p> {recipient?.name ? recipient.name : recipientEmail} </p>
    </Container>
  )
}

export default Chat

const Container = styled.div`
  display: flex;
  cursor: pointer;
  padding: 15px;
  word-break: break-word;

  :hover {
    background-color: #e9eaeb;
  }
`

const UserAvatar = styled(Avatar)`
  margin: 5px;
  margin-right: 15px;
`
