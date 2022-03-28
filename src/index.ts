import * as interfaces from "./interfaces";
import { lex } from "./lexer";
import * as fs from "fs";

const lego:string = fs.readFileSync("./index.lego", "utf-8");
let begun: boolean = false, ended: boolean = false;
const lexed:interfaces.lexerObj[] = lex(lego);
let transpiled: string = "";
let indent = 0;

console.log(lexed);

lexed.forEach((v: interfaces.lexerObj, i: number): void => {
    if(!transpiled) {
        if(v.type !== "start" && v.value) {
            console.error(`New error at line ${i} \`${v.value}\`. \`omg bestie!\` must be run in order to begin a program.`);
        } else if(v.type === "end") {
            console.error(`New error at line ${i} \`${v.value}\`. Program is empty upon end.`);
        }
    }

    if(v.indentation < indent) {
        transpiled += "}".repeat(Math.round(v.indentation / indent / 2) + 1) + " ";
    }

    indent = v.indentation;

    switch(v.type) {
        case "start": 
            transpiled += " ";
        break;
        case "end": break;
        case "cout":
            transpiled += `console.log(${(v.value.match(/["'`][^"'`\\]*(?:\\[\s\S][^"'`\\]*)*["'`]/)?.[0] || "").trim()});`;
        break;
        case "else":
            transpiled += "else {";
        break;
        case "else if":
            transpiled += `else if(${((v.value.match(/gatekeep[\s\S]+\?/)?.[0] || "false").replace(/gaslights/gi, "===")).trim()}) {`;
        break;
        case "declaration":
            transpiled += v.value.replace(/gaslights/gi, "=").replace(/girlboss/gi, "var").trim() + ";";
        break;
        case "conditional":
            transpiled += `${v.value.startsWith("gatekeeping") ? "while" : "if"}(${(v.value.match(/gatekeep[\s\S]+\?/)?.[0] || "false").replace(/gaslights/gi, "===").replace(/gatekeeping|gatekeep/i, "").trim()}) {`;
        break;
    }

    transpiled += "\n";
});

while(transpiled.match(/[{}]/g)) {
    transpiled = transpiled.replace(/\{([^\{\}]+)\}/gi, $1 => {
        return $1.split("\n").map((v: string, i: number, a: string[]): string => i % (a.length - 1) ? "\t" + v : v).join("\n").replace(/\{/g, "OPEN_BRACKET").replace(/\}/g, "CLOSE_BRACKET");
    });
}

transpiled = transpiled.replace(/OPEN_BRACKET/g, "{").replace(/CLOSE_BRACKET/g, "}");

console.log(transpiled);