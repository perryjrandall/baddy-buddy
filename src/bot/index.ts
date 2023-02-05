import {Command} from "commander";
import {command as serve} from "./serve";

export const command = new Command("bot")
    .description("Bot related functionality")
    .addCommand(serve);