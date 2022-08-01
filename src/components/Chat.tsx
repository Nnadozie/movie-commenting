import { FormEventHandler, useEffect, useState } from 'react';
import {
  auth,
  provider,
  signInWithPopup,
  GoogleAuthProvider,
  getDatabase,
  ref,
  set,
  serverTimestamp,
  push,
  onValue,
} from '../firebase';
import { ChatProvider, useChatContext } from '../state/store';
import { useForm, SubmitHandler } from 'react-hook-form';
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

function Chat() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  type SendHandler = (innerHtml: string, textContent: string, innerText: string, nodes: NodeList) => void;
  const onSubmit: SubmitHandler<{ [x: string]: any }> = (data) => {
    sendComment(data.comment);
    console.log(data);
  };

  const onSend: SendHandler = (data) => {
    sendComment(data);
    console.log(data);
  };
  console.log(errors);

  type Comment = { comment: string; name: string; timestamp: string; uid: string; photoURL: string };

  const { dispatch, user } = useChatContext();
  console.log(user);
  const [comments, setComments] = useState<{ [key: string]: Comment }>({});

  const { name, runtime } = useParams();
  const movieID = name ?? '' + runtime ?? '';
  const db = getDatabase();

  const movieRef = ref(db, `movies/${movieID}`);
  const navigate = useNavigate();

  function sendComment(comment: string) {
    push(movieRef, {
      comment: comment,
      name: user?.displayName,
      timestamp: serverTimestamp(),
      uid: user?.uid,
      photoURL: user?.photoURL,
    });
  }

  useEffect(() => {
    if (movieID) {
      onValue(movieRef, (snapshot) => {
        const data = snapshot.val();
        if (data !== null) setComments(data);
        console.log(data);
      });
    }
  }, [movieID]);

  function signIn() {
    //signInWithRedirect(auth, provider);
    signInWithPopup(auth, provider)
      .then((result) => {
        //This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        // The signed-in user info.
        const user = result.user;
        dispatch({ type: 'SET_USER', value: result.user });
        // ...
        console.log(user, credential, token);
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...

        console.log(errorMessage, errorCode, email, credential);
      });
  }

  return (
    <div id="chat">
      {!user ? (
        <button type="submit" onClick={signIn}>
          Sign in With Google
        </button>
      ) : (
        <div style={{ position: 'relative', height: '500px' }}>
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
