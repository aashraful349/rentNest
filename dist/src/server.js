import app from "./app";
import config from "./config";
import { prisma } from "./lib/prisma";
const port = config.port;
async function main() {
    try {
        await prisma.$connect();
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    }
    catch (error) {
        console.error("Error connecting to the database:", error);
        await prisma.$disconnect();
        process.exit(1);
    }
}
main();
//# sourceMappingURL=server.js.map