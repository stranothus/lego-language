import * as interfaces from "./interfaces";

export function parse(lexed: interfaces.lexerObj[]): string {
    let transpiled: string = "";
    let indent: number = 0;

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

    return transpiled;
}