var Polly = require('aws-sdk/clients/polly')
var markup = /<[^>]+>/

module.exports = tts

function tts (opts) {
  var charset = opts.charset || 'utf-8'
  var client = new Polly({
    apiVersion: opts.version || '2016-06-10',
    accessKeyId: opts.key,
    secretAccessKey: opts.secret,
    region: opts.region || 'us-west-2'
  })

  return send

  function send (text, opts, cb) {
    if (typeof text == 'object')
      cb = opts, opts = text, text = opts.text

    if (typeof opts == 'function')
      cb = opts, opts = {}

    var params = {
      Text: text,
      VoiceId: opts.voice || 'Russell',
      OutputFormat: (opts.format || (
        opts.marks ? 'json' : 'mp3'
      ))
    }

    if (opts.rate) params.SampleRate = opts.rate
    if (opts.type || markup.test(text)) params.TextType = opts.type || 'ssml'
    if (opts.marks) params.SpeechMarkTypes = [].concat(opts.marks)
    if (opts.lexicons) params.LexiconNames = [].concat(opts.lexicons)

    client.synthesizeSpeech(params, cb)
  }
}
