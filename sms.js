var SNS = require('aws-sdk/clients/sns')

module.exports = sms

function sms (opts) {
  var client = new SNS({
    apiVersion: opts.version || '2010-03-31',
    accessKeyId: opts.key,
    secretAccessKey: opts.secret,
    region: opts.region || 'us-west-2'
  })

  return send

  function send (opts, cb) {
    var params = {
      PhoneNumber: opts.to,
      Message: opts.text,
      MessageAttributes: {
        'AWS.SNS.SMS.SMSType': {
          DataType: 'String',
          StringValue: 'Transactional'
        }
      }
    }

    if (opts.from) {
      params.MessageAttributes['AWS.SNS.SMS.SenderID'] = {
        DataType: 'String',
        StringValue: opts.from
      }
    }

    client.publish(params, cb || function () {})
  }
}
