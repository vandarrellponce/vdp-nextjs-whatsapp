import styled from 'styled-components'
import { Avatar, Button } from '@material-ui/core'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import ChatIcon from '@material-ui/icons/Chat'
import SearchIcon from '@material-ui/icons/Search'
import { IconButton } from '@material-ui/core'
import * as EmailValidator from 'email-validator'

const Sidebar = () => {
  const createChat = () => {
    const input = prompt(
      'Please enter email address for the user you want to chat with.'
    )

    if (!input) return null
    if (EmailValidator.validate(input)) {
      // We need to add the chat into the DB 'chats' collection
    }
  }
  return (
    <Container>
      <Header>
        <UserAvatar />

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
    </Container>
  )
}

export default Sidebar

const Container = styled.div``

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
