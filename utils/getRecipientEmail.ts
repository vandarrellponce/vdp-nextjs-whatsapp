const getRecipientEmail = (users, recipientEmail) => {
  return users.filter((email) => email !== recipientEmail)[0]
}

export default getRecipientEmail
