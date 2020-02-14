import React, { Component } from 'react';
import { Widget,addResponseMessage } from 'react-chat-widget';

import 'react-chat-widget/lib/styles.css';

class ChatBoxComponent extends Component {
    componentDidMount() {
        addResponseMessage("Welcome to this chat!");
    }

    handleNewUserMessage = (newMessage) => {
        console.log(`New message incoming! ${newMessage}`);
        // Now send the message throught the backend API
        addResponseMessage(newMessage);
    }

    render() {
        return (
            <div className="chatBox">
                <Widget 
                    handleNewUserMessage={this.handleNewUserMessage}
                    title="My title"
                    subtitle="My subtitle"
                />
            </div>
        );
    }
}

export default ChatBoxComponent;