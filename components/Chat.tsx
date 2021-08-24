const Chat: React.FC<{
  users: string[]
  id: string
}> = ({ users }) => {
  return (
    <div>
      {users.map((email) => (
        <div>{email}</div>
      ))}
    </div>
  )
}

export default Chat
