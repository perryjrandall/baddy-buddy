#!/usr/bin/env ts-node

import { program } from "commander";
import * as process from "process";
import {command as bot} from "./bot";


program
    .version("0.0.1")
    .addCommand(bot)
    .parse(process.argv);
