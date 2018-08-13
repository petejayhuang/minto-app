const express = require('express')
const path = require('path')

const app = express()

app.use(express.static('client/build'))

app.get('*', (req, res) => {
  console.log('req', req)
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
})

app.listen(process.env.PORT || 8000, () => {
  console.log('🚀 Server started')
  console.log(`process.env.NODE_ENV: ${process.env.NODE_ENV}`)
})
