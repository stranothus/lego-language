import * as interfaces from "./interfaces";
import { lex } from "./lexer";
import { parse } from "./parser";
import * as fs from "fs";

const lego:string = fs.readFileSync("./index.lego", "utf-8");
const lexed:interfaces.lexerObj[] = lex(lego);
const parsed = parse(lexed);


console.log(parsed);