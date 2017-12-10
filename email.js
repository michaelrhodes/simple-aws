var ses = require('aws-sdk/clients/ses')

module.exports = email

function email (opts) {
  var charset = opts.charset || 'utf-8'
  var client = new ses({
    apiVersion: opts.version || '2010-12-01',
    accessKeyId: opts.key,
    secretAccessKey: opts.secret,
    region: opts.region || 'us-west-2'
  })

  return send

  function send (opts, cb) {
    var params = {
      Source: opts.from,
      Destination: {
        ToAddresses: []
          .concat(opts.to)
      },
      Message: {
        Body: {},
        Subject: {
          Charset: charset,
          Data: opts.subject
        }
      }
    }

    if (opts.html) params.Message.Body.Html = {
      Charset: charset,
      Data: opts.html
    }

    if (opts.text) params.Message.Body.Text = {
      Charset: charset,
      Data: opts.text
    }

    client.sendEmail(params, cb)
  }
}
