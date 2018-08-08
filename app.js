const express = require('express')

const app = express()

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'))

  const path = require('path')
  app.get('*', (req, res) => {
    res.sendFile(path, resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

app.listen(process.env.PORT || 8000, () => {
  console.log('🚀 Server started')
  console.log(`process.env.NODE_ENV: ${process.env.NODE_ENV}`)
})
