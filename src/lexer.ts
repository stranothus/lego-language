import * as interfaces from "./interfaces";

export function lex(input: string): interfaces.lexerObj[] {
    input = input.replace(/btw[^\n$]*/gi, "");

    return input.split("\n").map(v => ({
        value: v.trim(),
        type: ((): string => {
            switch(v.trim().split(" ")[0]) {
                case "gatekeep": return /\?$/.test(v.trim()) ? "conditional" : "";
                case "gatekeeping": return /\?$/.test(v.trim()) ? "conditional" : "";
                case "ono": return v.split(" ")[1] === "gatekeep" ? "else if" : "else";
                case "omg": return /omg\s+bestie\!/i.test(v) ? "start" : "";
                case "im": return /im\s+going\s+to\s+play\s+mc\!/i.test(v) ? "end" : "";
                case "girlboss": return "declaration";
                case "yay": return "cout";
                default: return "";
            }
        })(),
        indentation: v.match(/^[ ]+/)?.[0]?.length || 0
    }));
}