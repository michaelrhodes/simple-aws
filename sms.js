var sns = require('aws-sdk/clients/sns')

module.exports = sms

function sms (opts) {
  var client = new sns({
    apiVersion: opts.version || '2010-03-31',
    accessKeyId: opts.key,
    secretAccessKey: opts.secret,
    region: opts.region || 'us-west-2'
  })

  return send

  function send (opts, cb) {
    var params = {
      Message: opts.message,
      PhoneNumber: opts.number,
      MessageAttributes: {
        'AWS.SNS.SMS.SMSType': {
          DataType: 'String',
          StringValue: 'Transactional'
        }
      }
    }

    if (opts.sender) {
      params.MessageAttributes['AWS.SNS.SMS.SenderID'] = {
        DataType: 'String',
        StringValue: opts.sender
      }
    }

    client.publish(params, cb)
  }
}
