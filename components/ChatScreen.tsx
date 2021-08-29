import { Avatar, IconButton } from '@material-ui/core'
import { useRouter } from 'next/dist/client/router'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollection } from 'react-firebase-hooks/firestore'
import styled from 'styled-components'
import { auth, db } from '../firebase'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import AttachFileIcon from '@material-ui/icons/AttachFile'
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon'
import MicIcon from '@material-ui/icons/Mic'
import getRecipientEmail from '../utils/getRecipientEmail'
import Message from './Message'
import { useState, useEffect, useRef } from 'react'
import firebase from 'firebase/app'
import getRecipientByEmail from '../utils/getRecipientByEmail'
import TimeAgo from 'timeago-react'

const ChatScreen: React.FC<{
  chat: any
  messages: any
}> = ({ chat, messages }) => {
  const router = useRouter()
  const [userInput, setUserInput] = useState<string>('')
  const [user] = useAuthState(auth)
  const [chatID, setChatID] = useState<any>()
  const recipientEmail = getRecipientEmail(chat.users, user.email)
  const recipient = getRecipientByEmail(recipientEmail)
  const endOfMessageRef = useRef(null)

  useEffect(() => {
    setChatID(router.query.ChatID as string)
  }, [router.query.ChatID])

  useEffect(() => {
    scrollToBottom()
  })

  const [messagesSnapshot] = useCollection(
    db
      .collection('chats')
      .doc(chatID)
      .collection('messages')
      .orderBy('timestamp', 'asc')
  )

  const showMessages = () => {
    if (messagesSnapshot) {
      return messagesSnapshot.docs.map((message) => (
        <Message
          key={message.id}
          sender={message.data().user}
          message={{
            ...message.data(),
            timestamp: message.data().timestamp?.toDate().getTime(),
          }}
        />
      ))
    } else {
      return JSON.parse(messages).map((message) => (
        <Message key={message.id} sender={message.user} message={message} />
      ))
    }
  }
  const scrollToBottom = () => {
    endOfMessageRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }

  const sendMessage = (e) => {
    e.preventDefault()
    db.collection('users')
      .doc(user.uid)
      .set(
        { lastSeen: firebase.firestore.FieldValue.serverTimestamp() },
        { merge: true }
      )

    db.collection('chats')
      .doc(router.query.ChatID as string)
      .collection('messages')
      .add({
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        message: userInput,
        user: user.displayName,
        photoURL: user.photoURL,
      })

    setUserInput('')
    scrollToBottom()
  }

  return (
    <Container>
      <HeaderContainer>
        {recipient ? (
          <Avatar src={recipient?.photoURL} />
        ) : (
          <Avatar>{recipientEmail[0]}</Avatar>
        )}
        <HeaderInformation>
          <h3>{recipient ? recipient.name : recipientEmail}</h3>
          <p>
            Last seen:{' '}
            {recipient ? (
              <TimeAgo datetime={recipient.lastSeen?.toDate()} />
            ) : (
              'Unavailable'
            )}
          </p>
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
      <MessagesContainer>
        {showMessages()}
        <EndOfMessage ref={endOfMessageRef} />
      </MessagesContainer>
      <InputContainer>
        <InsertEmoticonIcon />
        <Input
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
        />
        <button
          hidden
          disabled={!userInput}
          type="submit"
          onClick={sendMessage}
        >
          Send Message
        </button>
        <MicIcon />
      </InputContainer>
    </Container>
  )
}

export default ChatScreen

const InputContainer = styled.form`
  display: flex;
  align-items: center;
  padding: 10px;
  position: sticky;
  bottom: 0;
  background-color: white;
  z-index: 100;
`

const Input = styled.input`
  flex: 1;
  outline: 0;
  border: none;
  border-radius: 10px;
  align-items: center;
  padding: 20px;
  margin-left: 15px;
  margin-right: 15px;
  background-color: whitesmoke;
`

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

const MessagesContainer = styled.div`
  padding: 30px;
  background-color: #e5ded8;
  min-height: 90vh;
`

const EndOfMessage = styled.div`
  margin-bottom: 4 0px;
`
