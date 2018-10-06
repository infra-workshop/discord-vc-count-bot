import ConsoleApplication from "./ConsoleApplication";

// Support source map.
require('source-map-support').install()
process.on('unhandledRejection', console.log);

const app = new ConsoleApplication();
app.run(process.argv);
