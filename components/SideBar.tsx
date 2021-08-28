import styled from 'styled-components'
import { Avatar, Button } from '@material-ui/core'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import ChatIcon from '@material-ui/icons/Chat'
import SearchIcon from '@material-ui/icons/Search'
import { IconButton } from '@material-ui/core'
import * as EmailValidator from 'email-validator'
import { auth, db } from '../firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollection } from 'react-firebase-hooks/firestore'
import Chat from './Chat'
import getRecipientEmail from '../utils/getRecipientEmail'

const Sidebar = () => {
  const [user] = useAuthState(auth)
  const userChatRef = db
    .collection('chats')
    .where('users', 'array-contains', user?.email)
  const chatsSnapshot = useCollection(userChatRef)
  /*   console.log(userChatRef) */
  /*   console.log(chatsSnapshot) */

  const createChat = () => {
    const input = prompt(
      'Please enter email address for the user you want to chat with.'
    )

    if (!input) return null
    if (
      EmailValidator.validate(input) &&
      !chatAlreadyExists(input) &&
      input !== user.email
    ) {
      // We need to add the chat into the DB 'chats' collection
      db.collection('chats').add({
        users: [user.email, input],
      })
    }
  }

  // This is my code after hours of debugging!
  const chatAlreadyExists = (recipientEmail) =>
    chatsSnapshot?.[0].docs.find((chat) => {
      return chat.data().users.includes(recipientEmail)
    })?.exists

  // I don't really get this code 100%
  /* chatsSnapshot?.[0].docs.find((chat) =>
        chat.data().users.find((user) => user === recipientEmail?.length > 0)
      ) */

  return (
    <Container>
      <Header>
        <UserAvatar src={user.photoURL} onClick={() => auth.signOut()} />

        <IconsContainer>
          <IconButton>
            <ChatIcon />
          </IconButton>

          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </IconsContainer>
      </Header>

      <SearchContainer>
        <SearchIcon />
        <SearchInput placeholder="Search in Chat" />
      </SearchContainer>

      <SidebarButton onClick={createChat}> Start a New Chat</SidebarButton>

      {/* List of Chats */}
      {chatsSnapshot?.[0] &&
        chatsSnapshot?.[0].docs.map((chat) => (
          <Chat
            key={chat.id}
            id={chat.id}
            recipientEmail={getRecipientEmail(chat.data().users, user.email)}
          />
        ))}
    </Container>
  )
}

export default Sidebar

const Container = styled.div`
  flex: 0.45;
  border-right: 1px solid whitesmoke;
  height: 100vh;
  min-width: 300px;
  max-width: 350px;
  overflow-y: scroll;

  ::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  background-color: white;
  padding: 15px;
  height: 80px;
  border-bottom: 1px solid whitesmoke;
`

const UserAvatar = styled(Avatar)`
  cursor: pointer;

  :hover {
    opacity: 0.8;
  }
`
const IconsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  border-radius: 2px;
`

const SearchInput = styled.input`
  outline-width: 0;
  border: none;
  flex: 1;
`

const SidebarButton = styled(Button)`
  border: none;
  background-color: white;
  width: 100%;
  &&& {
    border-top: 1px solid whitesmoke;
    border-bottom: 1px solid whitesmoke;
  }
`
