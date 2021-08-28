import moment from 'moment'
import { useAuthState } from 'react-firebase-hooks/auth'
import styled from 'styled-components'
import { auth } from '../firebase'

const Message: React.FC<{
  sender: any
  message: any
}> = ({ sender, message }) => {
  const [loggedInUser] = useAuthState(auth)
  const loggedInUserName = loggedInUser.displayName
  const TypeOfMessage =
    loggedInUserName === sender ? SenderMessage : RecieverMessage

  return (
    <Container>
      <TypeOfMessage>
        {message.message}
        <Timestamp>
          {message.timestamp ? moment(message.timestamp).format('LT') : '...'}
        </Timestamp>
      </TypeOfMessage>
    </Container>
  )
}

export default Message

const Container = styled.div``
const MessageElement = styled.p`
  width: fit-content;
  min-width: 60px;
  padding: 10px;
  padding-bottom: 26px;
  border-radius: 8px;
  margin: 4px;
  position: relative;
  text-align: right;
`
const SenderMessage = styled(MessageElement)`
  margin-left: auto;
  background-color: #dcf8c6;
`

const RecieverMessage = styled(MessageElement)`
  text-align: left;
  background-color: whitesmoke;
`

const Timestamp = styled.span`
  color: gray;
  padding: 10px;
  font-size: 8px;
  position: absolute;
  margin-top: 10px;
  bottom: 0;
  text-align: right;
  right: 0;
`
