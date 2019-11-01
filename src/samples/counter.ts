import { IStorySample } from '@/models/StorySample'

const counter: IStorySample = {
  logs: {
    name: 'counter',
    files: [
      'counter'
    ],
    services: [
      'http',
      'redis'
    ]
  },
  code: `redis set key:"count" value:0\nwhen http server listen path:"/counter" as request\n  count = redis increment key:"count" by:1\n  request write content:"This page has been visited {count} times"`,
  tips: [{
    name: 'welcome-to-storyscript',
    text: "This is Storyscript, the cloud-native programming language.\n\nLet's take a quick walk through the language features with this example building a simple counter application.",
    x: 256,
    y: 76
  }, {
    name: 'storyscript-redis',
    text: "Storyscript removes the need for you to care about infrastructure. When this story runs, the platform will create, configure and connect a Redis database so you don't have to!\n\nBy integrating with the Open Microservice Specification, a library of services become available on the Storyscript Hub.",
    x: 90,
    y: 118
  }, {
    name: 'storyscript-oms',
    text: 'The Open Microservice Specification also allows Storyscript to strongly type interactions with microservices with IDE support.',
    x: 372,
    y: 118
  }, {
    name: 'storyscript-http',
    text: 'Services in Storyscript can also be event driven.\n\nHere, an http server listens for events and the inner block is executed when a request is received.',
    x: 133,
    y: 140
  }, {
    name: 'storyscript-deploy',
    text: 'How about we deploy this story, and see what the platform takes care of for you?',
    x: 304,
    y: 20
  }]
}

export default counter
