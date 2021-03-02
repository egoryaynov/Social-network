import React from 'react';
import {Avatar, Button, Grid, Typography} from "@material-ui/core";
import {useFormik} from "formik";

type ChatMessageType = {
    message: string
    photo: string
    userId: number
    userName: string
}
const ChatPage = () => {
    const [messages, setMessages] = React.useState<ChatMessageType[]>([])
    const wsChannel = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')

    React.useEffect(() => {
        wsChannel.addEventListener('message', wsMessage => {
            setMessages((prevMessages) => [...prevMessages, ...JSON.parse(wsMessage.data)])
        })
    }, [])

    const sendMessage = (message: string) => {
        wsChannel.send(message)
    }

    return (
        <>
            <Grid container style={{maxHeight: 'calc(100vh - 150px)', overflow: 'auto'}}>
                {messages.map((message, index) => {
                    return <Grid style={{marginBottom: '20px'}} key={index} container alignItems={"center"}>
                        <Avatar src={message.photo}/>
                        <Grid style={{marginLeft: '10px'}}>
                            <Typography style={{fontWeight: 'bold'}}>{message.userName}</Typography>
                            <Typography>{message.message}</Typography>
                        </Grid>
                    </Grid>
                })}
            </Grid>
            <ChatForm sendMessage={sendMessage}/>
        </>
    );
};

const ChatForm: React.FC<{ sendMessage: (message: string) => void }> = ({sendMessage}) => {
    const formik = useFormik({
        initialValues: {
            message: ''
        },
        onSubmit: (values) => {
            sendMessage(values.message)
        }
    });

    return (
        <Grid container style={{backgroundColor: '#dddddd'}}>
            <textarea
                style={{resize: 'none', width: '90%', height: 50, fontSize: '22px', outline: 'none'}}
                onChange={formik.handleChange}
                placeholder="Message"
                name="message"
                value={formik.values.message}
            />
            <Button color={"primary"} onClick={formik.submitForm}>Submit</Button>
        </Grid>
    )
}

export default ChatPage;
