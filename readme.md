# simple-aws

simple-aws is a collection of functions that simplify the use of some common AWS products

## install

```sh
npm install michaelrhodes/simple-aws
```

## use

### sms
```js
var sms = require('simple-aws/sms')({
  key: process.env.AWS_ACCESS_KEY_ID,
  secret: process.env.AWS_SECRET_ACCESS_KEY
})

var message = {
  to: '000',
  text: 'Halp!'
}

sms(message)
```

### email
```js
var email = require('simple-aws/email')({
  key: process.env.AWS_ACCESS_KEY_ID,
  secret: process.env.AWS_SECRET_ACCESS_KEY
})

var message = {
  to: 'commish@police.tas.gov.au',
  from: 'Jamie Citizen <jamie.citizen@gmail.com>',
  subject: 'Halp!',
  text: 'Still waiting for help, mate…',
  html: '<em>Still</em> waiting for help, mate…'
}

email(message)
```

### tts
```js
var fs = require('fs')
var tts = require('simple-aws/tts')({
  key: process.env.AWS_ACCESS_KEY_ID,
  secret: process.env.AWS_SECRET_ACCESS_KEY
})

var message = 'I am Jamie Citizen. This is my last will and testament…'

tts(message, function (err, res) {
  fs.writeFileSync('./death-note.mp3', res.AudioStream)
})
```
## obey

[MIT](http://opensource.org/licenses/MIT)
