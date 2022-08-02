import { useEffect, useState } from 'react';
import { auth, provider, signInWithPopup, getDatabase, ref, serverTimestamp, push, onValue } from '../firebase';
import { useChatContext } from '../state/store';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  Avatar,
  ConversationHeader,
} from '@chatscope/chat-ui-kit-react';

type SendHandler = (innerHtml: string, textContent: string, innerText: string, nodes: NodeList) => void;
type Comment = { comment: string; name: string; timestamp: string; uid: string; photoURL: string };

function Chat() {
  const [comments, setComments] = useState<{ [key: string]: Comment }>({});

  const { dispatch, user } = useChatContext();

  const { name, runtime } = useParams();

  const movieID = name ?? '' + runtime ?? '';

  const db = getDatabase();

  const movieRef = ref(db, `movies/${movieID}`);

  useEffect(() => {
    if (movieID) {
      onValue(movieRef, (snapshot) => {
        const data = snapshot.val();
        if (data !== null) setComments(data);
      });
    }
  }, [movieID]);

  function signIn() {
    //signInWithRedirect(auth, provider);
    signInWithPopup(auth, provider)
      .then((result) => {
        dispatch({ type: 'SET_USER', value: result.user });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const onSend: SendHandler = (data) => {
    sendComment(data);
  };

  function sendComment(comment: string) {
    push(movieRef, {
      comment: comment,
      name: user?.displayName,
      timestamp: serverTimestamp(),
      uid: user?.uid,
      photoURL: user?.photoURL,
    });
  }

  const navigate = useNavigate();

  return (
    <div id="chat">
      {!user ? (
        <button type="submit" onClick={signIn}>
          Sign in With Google
        </button>
      ) : (
        <div style={{ position: 'relative', height: '100vh' }}>
          <MainContainer>
            <ChatContainer>
              <ConversationHeader>
                <ConversationHeader.Back onClick={() => navigate(-1)} />
                <ConversationHeader.Content info={`${name} Comments`.toUpperCase()} />
              </ConversationHeader>
              <MessageList>
                {Object.values(comments).map((comment: Comment) => (
                  <Message
                    model={{
                      message: comment.comment,
                      sentTime: comment.timestamp,
                      sender: comment.name,
                      direction: comment.uid === user.uid ? 'outgoing' : 'incoming',
                      position: 'normal',
                    }}
                  >
                    <Avatar
                      src={comment.photoURL ?? 'https://chatscope.io/storybook/react/static/media/joe.641da105.svg'}
                      name={user.displayName ?? undefined}
                    />
                  </Message>
                ))}
              </MessageList>
              <MessageInput attachButton={false} placeholder="Type comment here" onSend={onSend} />
            </ChatContainer>
          </MainContainer>
        </div>
      )}
    </div>
  );
}

export default Chat;
