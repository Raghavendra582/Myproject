const http = require("http");
const fs = require("fs");
const path = require("path");

const connectDB = require("./config/db");

connectDB();

const server = http.createServer((req, res) => {

    if (req.url === "/") {

        fs.readFile(
            path.join(__dirname, "public", "index.html"),
            (err, data) => {

                res.writeHead(200, {
                    "Content-Type": "text/html"
                });

                res.end(data);

            }
        );

    }

});

server.listen(5000, () => {
    console.log("Server Running on http://localhost:5000");
});