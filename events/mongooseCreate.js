const client = require("../index")
const { connect, mongoose } = require('mongoose');
mongoose.set("strictQuery", false);
connect(client.Config.MongoURI, {
    useNewUrlParser: true,

}).then(() => console.log("[ONLINE] Database up"))