import axios from 'axios'

// ** Get User Profile
export const getUserProfile = () => (dispatch) =>
  axios.get('/apps/chat/users/profile-user').then((res) =>
    dispatch({
      type: 'GET_USER_PROFILE',
      userProfile: res.data,
    }),
  )

// ** Get Chats & Contacts
export const getChatContacts = () => (dispatch) => {
  axios.get('/apps/chat/chats-and-contacts').then((res) => {
    dispatch({
      type: 'GET_CHAT_CONTACTS',
      data: res.data,
    })
  })
}

// ** Select Chat
export const selectChat = (id) => (dispatch) => {
  axios.get('/apps/chat/get-chat', { id }).then((res) => {
    dispatch({ type: 'SELECT_CHAT', data: res.data })
    dispatch(getChatContacts())
  })
}

// ** Send Msg
export const sendMsg = (obj) => (dispatch) => {
  axios.post('/apps/chat/send-msg', { obj }).then((res) => {
    dispatch({ type: 'SEND_MSG', data: res.data })
    dispatch(selectChat(obj.contact.id))
  })
}
