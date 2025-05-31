// const http = require("http");
// const fs = require("fs");

// const server = http.createServer((req, res) => {
//     const stream = fs.createReadStream("sample.txt");
//     stream.pipe(res);//to get the data from the file and send it to the client
//     // fs.readFile("sample.txt", (err, data) => {
//     //     res.end(data);
//     // })
// });
// server.listen(3000);
// //stream is better for larger file transmission

const http = require("http");
const fs = require("fs");

let homeContent = "";
let projectContent = "";

fs.readFile("home.html", (err, home) => {
    if (err) {
        throw err;
    }
    homeContent = home;
});

fs.readFile("project.html", (err, project) => {
    if (err) {
        throw err;
    }
    projectContent = project;
});

fs.readFile("registration.html", (err, registration) => {
    if (err) {
        throw err;
    }
    // eslint-disable-next-line no-undef
    regContent = registration;
});

const minimist = require('minimist');
// eslint-disable-next-line no-undef
const args = minimist(process.argv.slice(2));
const port = parseInt(args.port);
http
    .createServer((request, response) => {
        let url = request.url;
        response.writeHeader(200, { "Content-Type": "text/html" });
        switch (url) {
            case "/project":
                response.write(projectContent);
                response.end();
                break;
            case "/registration":
                // eslint-disable-next-line no-undef
                response.write(regContent);
                response.end();
                break;
            default:
                response.write(homeContent);
                response.end();
                break;
        }
    })
    .listen(port);