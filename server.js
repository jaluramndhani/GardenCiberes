const { createServer } = require("http")
const { parse } = require("url")
const next = require("next")
const fs = require("fs")
const path = require("path")

const dev = process.env.NODE_ENV !== "production"
const hostname = "localhost"
const port = process.env.PORT || 3000
const app = next({ dev, hostname, port })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true)
      const { pathname } = parsedUrl

      // Handle static HTML files
      if (pathname.endsWith(".html")) {
        const filePath = path.join(__dirname, pathname)

        // Check if the file exists
        try {
          await fs.promises.access(filePath, fs.constants.F_OK)

          // File exists, serve it
          const content = await fs.promises.readFile(filePath, "utf8")
          res.writeHead(200, { "Content-Type": "text/html" })
          res.end(content)
        } catch (error) {
          // File doesn't exist, let Next.js handle it
          await handle(req, res, parsedUrl)
        }
      } else {
        // Let Next.js handle all other requests
        await handle(req, res, parsedUrl)
      }
    } catch (err) {
      console.error("Error occurred handling", req.url, err)
      res.statusCode = 500
      res.end("Internal Server Error")
    }
  }).listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://${hostname}:${port}`)
  })
})
