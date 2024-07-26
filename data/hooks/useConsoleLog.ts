export default function useConsoleLog(info?: any, line?: any) {
    // Initialize state with undefined width/height so server and client renders match
    // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
    let log;

    if(process.env.NODE_ENV !== "production") {
        if(line === undefined) {
            log = console.log(info);
        } else {
            log = console.log(`Line: ${line}`, info);
        }
    }

    return log;
}
