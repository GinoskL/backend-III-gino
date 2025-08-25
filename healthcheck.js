import http from "http"

const options = {
  host: "localhost",
  port: process.env.PORT || 8080,
  path: "/api/sessions/current",
  timeout: 2000,
  method: "GET",
}

const request = http.request(options, (res) => {
  console.log(`Health check status: ${res.statusCode}`)
  if (res.statusCode === 200 || res.statusCode === 401) {
    process.exit(0)
  } else {
    process.exit(1)
  }
})

request.on("error", (err) => {
  console.log("Health check failed:", err.message)
  process.exit(1)
})

request.end()
