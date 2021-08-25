import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { useAuthState } from 'react-firebase-hooks/auth'
import styled from 'styled-components'
import ChatScreen from '../../components/ChatScreen'
import Sidebar from '../../components/SideBar'
import { auth, db } from '../../firebase'
import getRecipientEmail from '../../utils/getRecipientEmail'

const ChatRoom = ({ chat, messages }) => {
  /*   console.log(chat, messages) */

  const [user] = useAuthState(auth)
  return (
    <Container>
      <Head>
        <title>Chat with {getRecipientEmail(chat.users, user.email)}</title>
      </Head>

      <Sidebar />

      <ChatContainer>
        <ChatScreen chat={chat} messages={messages} />
      </ChatContainer>
    </Container>
  )
}

export default ChatRoom

export const getServerSideProps: GetServerSideProps = async (context) => {
  const chatID = context.params.ChatID
  const ref = db.collection('chats').doc(chatID as string)

  // PREP THE MESSAGES IN THE SERVER
  const messagesRes = await ref
    .collection('messages')
    .orderBy('timestamp', 'asc')
    .get()

  const messages = messagesRes.docs
    .map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    .map((messages: { timestamp: any; id: string }) => ({
      ...messages,
      timestamps: messages.timestamp.toDate().getTime(),
    }))

  // PREP THE CHATS
  const chatRes = await ref.get()
  const chat = {
    id: chatRes.id,
    ...chatRes.data(),
  }

  return {
    props: {
      messages: JSON.stringify(messages),
      chat: chat,
    },
  }
}

const Container = styled.div`
  display: flex;
`

const ChatContainer = styled.div`
  flex: 1;
  overflow: scroll;
  height: 100vh;

  ::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
`
