import styled from 'styled-components'

const Message: React.FC<{
  user: any
  message: any
}> = ({ user, message }) => {
  return (
    <Container>
      <p>{message}</p>
    </Container>
  )
}

export default Message

const Container = styled.div``
