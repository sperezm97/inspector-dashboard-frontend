import classnames from 'classnames'
import Avatar from '@components/avatar'
import { useState, useEffect } from 'react'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { Send, FileText, Image } from 'react-feather'
import { Row, Col, Card, CardHeader, Form, InputGroup, Input, Button, UncontrolledCollapse, Modal, ModalHeader, ModalBody, Spinner } from 'reactstrap'

import FileUploader from './FileUploader'

import 'uppy/dist/uppy.css'
import '@styles/react/libs/file-uploader/file-uploader.scss'
import '@styles/base/pages/app-chat-list.scss'

import { formatDate } from '../../../../utility/Utils'
import { getTicketArticleAttachment } from '../../../../services/zammad/ticketArticles'
import { sweetAlert } from '../../../../@core/components/sweetAlert'

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

const CardChat = function({
  dataTicketArticles, 
  dataTicketId, 
  dataUserMe, 
  handlePostTicketArticles, 
  loadingPost, 
  msg, 
  setMsg,
  previewArr, 
  setPreviewArr,
  previewUpload, 
  setPreviewUpload}) {

  const [chatRef, setChatRef] = useState(null)
  const [chatData, setChatData] = useState(data)

  const [modal, setModal] = useState(null)

  const [dataImage, setDataImage] = useState(null)
  const [dataImageBase, setDataImageBase] = useState(null)

  useEffect(() => {
    if(dataImage?.status === 200){
      setDataImageBase(Buffer.from(dataImage?.data, 'binary').toString('base64'))
    }
  }, [dataImage])

  const toggleModal = (id, idArticleTicket) => {
    console.log(idArticleTicket)
    if (modal !== id) {
      setModal(id)
      setDataImage(null)
      getTicketArticleAttachment(dataTicketId, idArticleTicket, id)
        .then(res => setDataImage(res))
    } else {
      setModal(null)
    }
  }

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
          id: msg.id,
          from: msg.from,
          msg: msg.body,
          attachments: msg.attachments,
          time: formatDate(msg.created_at),
        })
      } else {
        chatMessageSenderId = msg.created_by_id
        formattedChatLog.push(msgGroup)
        msgGroup = {
          senderId: msg.created_by_id,
          messages: [
            {
              id: msg.id,
              from: msg.from,
              msg: msg.body,
              attachments: msg.attachments,
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
    formattedChatData().map((item, index) => (
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
                    {chat.attachments[0] &&
                      <>
                        <Button.Ripple 
                          size="sm" 
                          // className='round'
                          color="primary" 
                          id={`toggler${chat.id}`} 
                          outline={item.senderId !== dataUserMe.id}
                        >
                          Mostrar adjuntos
                        </Button.Ripple >
                        <UncontrolledCollapse toggler={`toggler${chat.id}`}>
                          <div className="mt-1 bg-white px-1 rounded">
                            {chat.attachments.map((att) => (
                              <div 
                                key={att.id}
                                className="py-1"
                              >
                                {/* <Share2 size={17} /> */}
                                <h6 
                                  // color='flat-primary' 
                                  style={{cursor: 'pointer'}}
                                  className="text-primary mb-0"
                                  onClick={() => toggleModal(att.id, chat.id)} 
                                >
                                  {att.filename}
                                </h6>
                                <Modal
                                  isOpen={modal === att.id}
                                  toggle={() => toggleModal(att.id, chat.id)}
                                  className="modal-dialog-centered modal-lg"
                                >
                                  <ModalHeader toggle={() => toggleModal(att.id, chat.id)}>
                                    {att.filename}
                                  </ModalHeader>
                                  <ModalBody>
                                    {dataImage ?
                                      dataImage.headers['content-type'].includes('video')
                                        ? 
                                        <div key={index}>
                                          <video 
                                            key={index} 
                                            className="rounded"
                                            width="100%"
                                            controls
                                          >
                                            <source src={`data:video/mp4;base64,${dataImageBase}`} type="video/mp4"/>
                                          </video>
                                        </div>
                                        :
                                          <div key={index}>
                                            <img 
                                              key={index}
                                              className="rounded" 
                                              width="100%"
                                              src={`data:image/jpeg;base64,${dataImageBase}`}
                                              alt="Adjunto de prueba" 
                                            />
                                          </div>
                                      : <div className="d-flex justify-content-center"><Spinner color='primary' /></div> 
                                    }
                                  </ModalBody>
                                </Modal>
                              </div>
                            ))}
                          </div>
                        </UncontrolledCollapse>
                      </>
                    }
                    <div className='mt-1'>
                      <p
                        className={classnames('text-muted', {
                          'position-left': item.senderId !== dataUserMe.id,
                        })}
                        >
                        {chat.time}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))

  //* * Scroll to chat bottom
  const scrollToBottom = () => {
    chatRef.scrollTop = Number.MAX_SAFE_INTEGER
  }

  useEffect(() => {
    if (chatRef !== null) {
      scrollToBottom()
    }
  }, [chatRef, dataTicketArticles])

  const handleSendMsg = (e) => {
    e.preventDefault()

    if(previewArr[0] && !msg.trim().length){
      return sweetAlert({
        title: 'Aviso',
        text: 'Debes escribir un mensaje.',
        type: 'warning'
      })
    }

    if (msg.trim().length) {
      const dataObj = {
        ticket_id: dataTicketId,
        subject: null,
        body: msg,
        type: 'note',
        attachments: previewArr
      }
      handlePostTicketArticles(dataObj)
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
          <div>
            <Button.Ripple 
              className="btn-icon" 
              color="flat-primary"
              id="togglerAttachments" 
            >
              <Image size={16} />
            </Button.Ripple>
          </div>
          <InputGroup className="input-group-merge mr-1 form-send-message">
            <Input
              value={msg}
              className="border-0"
              onChange={(e) => setMsg(e.target.value)}
              placeholder="Escribir mensaje..."
            />
          </InputGroup>
          <Button className="send" color="primary" disabled={!!loadingPost}>
            {loadingPost
              ? <Spinner color="white" size='sm' />
              :
                <>
                  <Send size={14} className="d-lg-none" />
                  <span className="d-none d-lg-block">
                    Enviar
                  </span>
                </>
            }
          </Button>
        </Form>
      </div>
      <UncontrolledCollapse 
        toggler="togglerAttachments"
      >
        <div className="row p-1">
          <div className="col-12">
            <FileUploader 
              previewArr={previewArr}
              setPreviewArr={setPreviewArr}
              previewUpload={previewUpload}
              setPreviewUpload={setPreviewUpload}
            />
          </div>
        </div>
      </UncontrolledCollapse>
    </Card>
  )
}

export default CardChat
