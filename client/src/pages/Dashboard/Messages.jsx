import React from 'react'
import Layout from '../Layout'
import styled from 'styled-components'
import FindIcon from '/Auth/find.svg'
import UserIcon from '/user.svg'
import { ChatData } from '../../Data'
const Wrap = styled.div`
  padding: 2rem 4rem;
`

const PageHead = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  min-height: 100px;
  padding: 1rem;
`

const HeadWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

const Title = styled.p`
  color: #222;
  font-size: 32px;
  font-weight: 700;
`

const Desc = styled.p`
  color: #222;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 28px;
`

const BodyWrap = styled.div`
  height: 100vh;
  width: 100%;
  padding: 1rem;
  flex: 5;
  display: flex;
`
const BodyLeft = styled.div`
  flex: 1.5;
  min-height: 100%;
  margin-right: 2rem;
  background-color: white;
  overflow-y: auto;
  scroll-behavior: smooth;
`
const BodyRight = styled.div`
  flex: 3.5;
  min-height: 100%;
  background-color: white;
  overflow-y: auto;
  scroll-behavior: smooth;
`
const SearchBox = styled.div`
  display: flex;
  background-color: #f1fcfa;
  margin: 2rem 1.5rem;
`
const SearchIcon = styled.img`
  width: 50px;
  padding: 15px;
`
const SearchInput = styled.input`
  width: 85%;
  background-color: #f1fcfa;
  padding: 0.5rem;
  border-radius: 6px;
  outline: none;
  border: none;
  font-size: 1rem;
`
const ChatsWrap = styled.div`
  height: 100%;
  padding: 0 1rem 1rem 1rem;
  min-width: 400px;
  position: relative;
`
const ChatSingle = styled.div`
  width: 100%;
  display: flex;
  padding: 1rem 1.5rem;
  align-items: center;
  position: relative;
  &:hover {
    background-color: #d9f1e1;
  }
`
const ChatImage = styled.img`
  width: 50px;
`
const ChatUserInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;
`
const ChatName = styled.p`
  color: #222;
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: 28px;
`
const ChatTime = styled.p`
  color: #6b7177;
  font-size: 14px;
  font-weight: 400;
  line-height: 28px;
`
const ChatUnread = styled.div`
  color: #fff;
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: 0.629px;
  text-transform: capitalize;
  background-color: #34a853;
  height: 20px;
  width: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  position: absolute;
  right: 30px;
`
const CurrentChatSingle = styled.div`
  width: 100%;
  display: flex;
  padding: 1rem 1.5rem;
  align-items: center;
  position: relative;
  justify-content: flex-start;
`
const SendChatSingle = styled.div`
  width: 100%;
  display: flex;
  padding: 1rem 1.5rem;
  align-items: center;
  position: relative;
  justify-content: flex-start;
`
const ReportBtn = styled.div`
  color: #f9ab00;
  text-align: right;
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: 28px; /* 186.667% */
  position: absolute;
  right: 30px;
`
const HorizontalLine = styled.hr`
  width: 100%;
  background-color: #e9e9e9;
  height: 2px;
  border: none;
`
const MessagesBody = styled.div`
  width: 100%;
  padding: 1rem;
`
const MessageUserInfo = styled.div`
  display: flex;
  margin-left: 10px;
`
const MessageChatStatus = styled(ChatTime)`
  margin-left: 10px;
`
const ChatMsg = styled.p`
  background-color: #f1fcfa;
  max-width: 60%;
  padding: 2rem;
  border-radius: 8px;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
`
const SendUserMessage = styled.div`
  width: 100%;
`
const ReceiveUserMessage = styled.div`
  width: 100%;
`
const ReceiveChatSingle = styled.div`
  width: 100%;
  display: flex;
  padding: 1rem 1.5rem;
  align-items: center;
  position: relative;
  justify-content: flex-end;
`
const ReceiveChatName = styled(ChatName)`
  margin-right: 10px;
`
const ReceiveMessageChatStatus = styled(ChatTime)`
  margin-right: 7px;
`
const ReceiveChatMsg = styled.p`
  background-color: #eaf6ee;
  max-width: 60%;
  padding: 2rem;
  border-radius: 8px;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  float: right;
  color: #5bbb7b;
  text-align: right;
`
const ChatFooter = styled.div`
  position: absolute;
  bottom: 0;
  min-height: 120px;
  width: 97%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`
const HorizontalLineFooter = styled.hr`
  width: 100%;
  background-color: #e9e9e9;
  height: 3px;
  border: none;
`
const MessageSec = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`
const MessageInput = styled.input`
  width: 100%;
  outline: none;
  font-size: 1rem;
  border: none;
  padding: 0.8rem;
`
const SendBtn = styled.button`
  display: flex;
  width: 221.133px;
  height: 51px;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  border-radius: 4px;
  border: 1px solid #5bbb7b;
  background: #5bbb7b;
  box-shadow: 0px 5px 20px 0px rgba(91, 187, 123, 0.15);
  font-size: 15px;
  font-weight: 600;
  color: white;
  cursor: pointer;
`
const Messages = () => {
  return (
    <Layout>
      <Wrap>
        <PageHead>
          <HeadWrap>
            <Title>Messages</Title>
            <Desc>All of your communications live here!</Desc>
          </HeadWrap>
        </PageHead>
        <BodyWrap>
          <BodyLeft>
            <SearchBox>
              <SearchIcon src={FindIcon} />
              <SearchInput placeholder='Search' />
            </SearchBox>
            <ChatsWrap>
              {ChatData.map((user) => (
                <ChatSingle key={user.id}>
                  <ChatImage src={UserIcon} />
                  <ChatUserInfo>
                    <ChatName>{user.Name}</ChatName>
                    <ChatTime>{user.LastSeen}</ChatTime>
                  </ChatUserInfo>
                  <ChatUnread>{user.UnreadMsgs}</ChatUnread>
                </ChatSingle>
              ))}
            </ChatsWrap>
          </BodyLeft>
          <BodyRight>
            <ChatsWrap>
              <CurrentChatSingle>
                <ChatImage src={UserIcon} />
                <ChatUserInfo>
                  <ChatName>Furqan Afzal</ChatName>
                  <ChatTime>Active</ChatTime>
                </ChatUserInfo>
                <ReportBtn>Report an Issue</ReportBtn>
              </CurrentChatSingle>
              <HorizontalLine />
              <MessagesBody>
                <SendUserMessage>
                  <SendChatSingle>
                    <ChatImage src={UserIcon} />
                    <MessageUserInfo>
                      <ChatName>Furqan Afzal</ChatName>
                      <MessageChatStatus>35 mins</MessageChatStatus>
                    </MessageUserInfo>
                  </SendChatSingle>
                  <ChatMsg>
                    How likely are you to recommend our company to your friends
                    and family?
                  </ChatMsg>
                </SendUserMessage>
                <ReceiveUserMessage>
                  <ReceiveChatSingle>
                    <MessageUserInfo>
                      <ReceiveMessageChatStatus>
                        35 mins
                      </ReceiveMessageChatStatus>
                      <ReceiveChatName>You</ReceiveChatName>
                    </MessageUserInfo>
                    <ChatImage src={UserIcon} />
                  </ReceiveChatSingle>
                  <ReceiveChatMsg>
                    Hey there, we’re just writing to let you know that you’ve
                    been subscribed to a repository on GitHub.
                  </ReceiveChatMsg>
                </ReceiveUserMessage>
                <SendUserMessage>
                  <SendChatSingle>
                    <ChatImage src={UserIcon} />
                    <MessageUserInfo>
                      <ChatName>Furqan Afzal</ChatName>
                      <MessageChatStatus>35 mins</MessageChatStatus>
                    </MessageUserInfo>
                  </SendChatSingle>
                  <ChatMsg>Ok, Understood!</ChatMsg>
                </SendUserMessage>
              </MessagesBody>
              <ChatFooter>
                <HorizontalLineFooter />
                <MessageSec>
                  <MessageInput placeholder='Type a message' />
                  <SendBtn>Send Message</SendBtn>
                </MessageSec>
              </ChatFooter>
            </ChatsWrap>
          </BodyRight>
        </BodyWrap>
      </Wrap>
    </Layout>
  )
}

export default Messages
