import { Avatar, IconButton } from '@material-ui/core'
import { useRouter } from 'next/dist/client/router'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollection } from 'react-firebase-hooks/firestore'
import styled from 'styled-components'
import { auth, db } from '../firebase'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import AttachFileIcon from '@material-ui/icons/AttachFile'
import getRecipientEmail from '../utils/getRecipientEmail'
import Message from './Message'

const ChatScreen: React.FC<{
  chat: any
  messages: any
}> = ({ chat, messages }) => {
  const [user] = useAuthState(auth)
  const router = useRouter()
  const [messagesSnapshot] = useCollection(
    db
      .collection('chats')
      .doc(router.query.id as string)
      .collection('messages')
      .orderBy('timestamp', 'asc')
  )

  const showMessages = () => {
    if (messagesSnapshot) {
      return messagesSnapshot.docs.map((message) => (
        <Message
          key={message.id}
          user={message.data().user}
          message={{
            ...message.data(),
            timestamp: message.data().timestamp?.toDate().getTime(),
          }}
        />
      ))
    }
  }
  return (
    <Container>
      <HeaderContainer>
        <UserAvatar />
        <HeaderInformation>
          <h3>recipient email</h3>
          <p>Last seen...</p>
        </HeaderInformation>
        <HeaderIcons>
          <IconButton>
            <AttachFileIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </HeaderIcons>
      </HeaderContainer>
      <MessageContainer>
        <EndOfMessage />
      </MessageContainer>
    </Container>
  )
}

export default ChatScreen

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

const HeaderContainer = styled.div`
  position: sticky;
  background-color: white;
  z-index: 10;
  top: 0;

  display: flex;
  padding: 11px;
  height: 80px;

  align-items: center;
  border-bottom: 1px solid whitesmoke;
`

const UserAvatar = styled(Avatar)`
  margin: 5px;
`

const HeaderInformation = styled.div`
  margin-left: 15px;
  flex: 1;

  > h3 {
    margin-bottom: 2px;
  }

  > p {
    margin-top: 3px;
    font-size: 14px;
    color: gray;
  }
`

const HeaderIcons = styled.div``

const MessageContainer = styled.div``

const EndOfMessage = styled.div``
