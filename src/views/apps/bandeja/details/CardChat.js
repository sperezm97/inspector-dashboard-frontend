import classnames from 'classnames'
import Avatar from '@components/avatar'
import { useState, useEffect } from 'react'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { Send, FileText } from 'react-feather'
import { Card, CardHeader, Form, InputGroup, Input, Button } from 'reactstrap'

import '@styles/base/pages/app-chat-list.scss'
import { formatDate } from '../../../../utility/Utils'

const data = {
  chat: {
    id: 2,
    userId: 1,
    unseenMsgs: 0,
    chat: [
      {
        message: "How can we help? We're here for you!",
        time: 'Julio 7 2021 07:45:00',
        senderId: 11,
      },
      {
        message:
          'Hey John, I am looking for the best admin template. Could you please help me to find it out?',
        time: 'Julio 7 2021 07:45:00',
        senderId: 1,
      },
      {
        message: 'It should be Bootstrap 4 compatible.',
        time: 'Julio 7 2021 07:45:55 ',
        senderId: 1,
      },
      { message: 'Absolutely!', time: 'Julio 7 2021 07:46:00 ', senderId: 11 },
      {
        message: 'Modern admin is the responsive bootstrap 4 admin template.!',
        time: 'Julio 7 2021 07:46:05 ',
        senderId: 11,
      },
      {
        message: 'Looks clean and fresh UI.',
        time: 'Julio 7 2021 07:46:23 ',
        senderId: 1,
      },
      {
        message: "It's perfect for my next project.",
        time: ' Julio 7 2021 07:46:33',
        senderId: 1,
      },
      {
        message: 'How can I purchase it?',
        time: 'Julio 7 2021 07:46:43',
        senderId: 1,
      },
      {
        message: 'Thanks, from ThemeForest.',
        time: 'Julio 7 2021 07:46:53',
        senderId: 11,
      },
      {
        message: 'I will purchase it for sure. 👍',
        time: 'Julio 7 2021 07:50:00',
        senderId: 1,
      },
    ],
  },
  contact: {
    id: 1,
    fullName: 'Felecia Rower',
    avatar: require('@src/assets/images/portrait/small/avatar-s-20.jpg')
      .default,
    status: 'away',
    rol: 'Reportero - Oficial',
  },
}

const CardChat = function({dataTicketArticles, dataTicketId, dataUserMe, handlePostTicketArticles}) {
  const [msg, setMsg] = useState('')
  const [chatRef, setChatRef] = useState(null)
  const [chatData, setChatData] = useState(data)

  //* * Formats chat data based on sender
  const formattedChatData = () => {
    let chatLog = []
    if (chatData) {
      chatLog = chatData.chat.chat
    }

    const formattedChatLog = []
    let chatMessageSenderId = dataTicketArticles[0] ? dataUserMe.id : undefined
    let msgGroup = {
      senderId: chatMessageSenderId,
      messages: [],
    }
    dataTicketArticles.forEach((msg, index) => {
      if (chatMessageSenderId === msg.created_by_id) {
        msgGroup.messages.push({
          from: msg.from,
          msg: msg.body,
          time: formatDate(msg.created_at),
        })
      } else {
        chatMessageSenderId = msg.created_by_id
        formattedChatLog.push(msgGroup)
        msgGroup = {
          senderId: msg.created_by_id,
          messages: [
            {
              from: msg.from,
              msg: msg.body,
              time: formatDate(msg.created_at),
            },
          ],
        }
      }
      if (index === dataTicketArticles.length - 1) formattedChatLog.push(msgGroup)
    })
    return formattedChatLog
  }

  //* * Renders user chat
  const renderChats = () =>
    formattedChatData().map((item, index) => {
      return (
        <div
          key={index}
          className={classnames('chat', {
            'chat-left ': item.senderId !== dataUserMe.id,
          })}
        >
          {/* <div className="chat-avatar header-profile-sidebar adove">
            {item.senderId !== 352 && (
              <>
                <Avatar
                  className=" cursor-pointer"
                  img={item.senderId !== 11 && chatData.contact.avatar}
                />
                <span className="font-weight-bolder align-text-top">
                  asd left
                </span>
                .
                <span className="align-text-top mr-3 user-post">
                  {' '}
                  {item.senderId !== 11 && chatData.contact.fullName}
                </span>
              </>
            )}
          </div> */}

          <div
            className={classnames('chat-body', {
              'chat-body below': item.senderId !== dataUserMe.id,
            })}
          >
            {item.messages.map((chat) => (
              <div key={chat.msg} className="row d-flex">
                {item.senderId !== dataUserMe.id &&
                  <div className="col-12" style={{marginBottom: '5px'}}>
                    <span className="font-weight-bolder align-text-top">
                      {chat.from}
                    </span>
                  </div>
                }
                <div className="col-12">
                  <div className="chat-content">
                    <p className="mb-1">{chat.msg}</p>
                    <small
                      className={classnames('text-muted', {
                        'position-left': item.senderId !== dataUserMe.id,
                      })}
                      >
                      {chat.time}
                    </small>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    })

  //* * Scroll to chat bottom
  const scrollToBottom = () => {
    chatRef.scrollTop = Number.MAX_SAFE_INTEGER
  }

  useEffect(() => {
    if (chatRef !== null) {
      scrollToBottom()
    }
  }, [chatRef, chatData.chat.chat.length])

  const handleSendMsg = (e) => {
    e.preventDefault()
    if (msg.trim().length) {
      const dataObj = {
        ticket_id: dataTicketId,
        subject: null,
        body: msg,
        type: 'note',
        attachments: []
      }
      handlePostTicketArticles(dataObj)
      setMsg('')
    }
  }

  return (
    <Card className="chat-widget">
      <CardHeader>
        <div className="d-flex align-items-center">
          <FileText />
          <h5 className="mb-0 ml-1">Información del Reporte</h5>
        </div>
      </CardHeader>
      <div className="chat-app-window">
        <PerfectScrollbar
          containerRef={(el) => setChatRef(el)}
          className="user-chats scroll-area"
          options={{ wheelPropagation: false }}
        >
          <div className="chats">{renderChats()}</div>
        </PerfectScrollbar>
        <Form className="chat-app-form" onSubmit={(e) => handleSendMsg(e)}>
          <InputGroup className="input-group-merge mr-1 form-send-message">
            <Input
              value={msg}
              className="border-0"
              onChange={(e) => setMsg(e.target.value)}
              placeholder="Escribir mensaje..."
            />
          </InputGroup>
          <Button className="send" color="primary">
            <Send size={14} className="d-lg-none" />
            <span className="d-none d-lg-block">Enviar</span>
          </Button>
        </Form>
      </div>
    </Card>
  )
}

export default CardChat
