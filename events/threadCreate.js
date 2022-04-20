
const client = require("..");

client.on("threadCreate", async (thread) => {
    try {
        await thread.join()
    } catch (error) {
        console.log(error.stack)
    }
})