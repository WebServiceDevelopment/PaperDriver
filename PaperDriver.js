"use strict";

const express = require('express')
const app = express()
const port = 3000

app.use(express.static('docs'))
app.listen(port, () => {
  console.log(`PaperDriver listening at http://localhost:${port}`)
})

