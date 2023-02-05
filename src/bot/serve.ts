import {Command} from "commander";
import * as fs from "fs";
import messenger from "facebook-chat-api";

export const command = new Command("serve")
    .description("Run the bot server")
    .action(serve_command);

function serve_command() {
    // This is used to login to facebook
    const appstate = fs.readFileSync("appstate.json").toString();
    loginWithAppstate(appstate);
}

function loginWithAppstate(appstate: string) {
    messenger({appState: JSON.parse(appstate)}, {}, (err, api) => {
        if (err) {
            console.log("login error:", err);
        } else {
            const server = new Server(api);
            server.listen();
        }
    })
}

type IMessageWithMentions = Facebook.IReceivedMessage & Facebook.IMentionsMessage;

class Server {
    api: Facebook.API;

    constructor(api: Facebook.API) {
        this.api = api;
    }

    listen() {
        this.api.listenMqtt(
            (err: Facebook.IError, event: Facebook.IReceived) => {
                if (err) {
                    console.log("listen error:", err);
                } else {
                    this.handleEvent(event);
                }
            }
        );
    }

    handleEvent(event: Facebook.IReceived) {
        switch (event.type) {
            case "message":
                this.handleMessage(event as IMessageWithMentions);
                break;
            default:
                console.log("Unknown event type:", event);
        }
    }

    handleMessage(message: IMessageWithMentions) {
        // Try and see if its a trigger word
        if (message.body.startsWith("/nick")) {
            this.handleNickname(message);
        }
    }

    handleNickname(message: IMessageWithMentions) {
        const target = Object.keys(message.mentions)[0];
        const parts = message.body.split(" ");
        const nickname = parts[parts.length - 1];

        console.log("Setting nickname for " + target + " to " + nickname);
        this.api.changeNickname(nickname, message.threadID, target, (err) => {
            if (err) {
                console.log("changeNickname error:", err);
            }
        })
    }
}