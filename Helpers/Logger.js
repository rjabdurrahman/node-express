import fs from "fs";
/*
ALL - This will log all log levels (INFO, DEBUG, INFO).
INFO - Information about the Request and Response created.
DEBUG - Information could be helpful for debugging like external API link.
ERROR - Error created from the server code or user input.
*/
const logDir = './logs';
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}
const filePath = './logs/out.log';
export default class Logger {
    static async expressLogger (req, res, next) {
        Logger.info(
            `${req.method} ${req.url}`
        )
        if(req.method === 'POST') Logger.info(
            `BODY ${JSON.stringify(req.body)}`
        )
        next()
    }

    static write(text, MODE) {
        try {
            fs.appendFileSync(filePath, [
                new Date().toISOString(),
                MODE || 'DEBUG',
                text
            ].join('\t|\t') + '\n');
        } catch (error) {
            console.log(error.message);
        }
    }

    static info(text) {
        Logger.write(text, 'INFO')
    }
    
    static error(text) {
        Logger.write(text, 'ERROR')
    }
}