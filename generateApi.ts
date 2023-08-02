import * as path from "path"
import * as Swagger from "swagger-typescript-api";
// import * as fs from "fs";
const {generateApi} = Swagger

generateApi({
    name: "Virazh-api",
    output: path.resolve(process.cwd(), "./src/types/API"),
    url: "http://localhost:8000/api-docs",
    generateClient: false,
    generateResponses: true,
    httpClientType: "axios",
    modular: true,
    addReadonly: true,
})
    .then(({files}) => {
        files.forEach(({fileName}) => {
            console.log(fileName)
            // fs.writeFile(path, fileContent, {})
        })
    })
