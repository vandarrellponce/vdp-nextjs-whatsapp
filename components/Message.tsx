import styled from 'styled-components'

const Message: React.FC<{
  user: any
  message: any
}> = ({ user, message }) => {
  return (
    <Container>
      <MessageContainer>
        <ActualMessage>{message.message}</ActualMessage>
        <Sender>{message.user}</Sender>
        {/*   <Time>{message.timestamp}</Time> */}
      </MessageContainer>
    </Container>
  )
}

export default Message

const Container = styled.div`
  display: flex;
`
const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  border-radius: 6px;
  background-color: #9ecc9e;
  margin: 4px;
`
const ActualMessage = styled.p`
  margin: 0;
  padding: 0;
`
const Sender = styled.p`
  font-size: 10px;
  margin-bottom: 0;
  margin-top: 5px;
`

const Time = styled.p`
  font-size: 10px;
  margin: 0;
`
