import { IStorySample } from '@/models/StorySample'
import code from './stripe.story'
import defaultCollaborators from './defaultCollaborators'

const stripe: IStorySample = {
  name: 'stripe',
  services: [
    'stripe',
    'postgres',
    'mailgun',
  ],
  stories: ['stripe'],
  code,
  collaborators: defaultCollaborators,
  description:
    'Inform customers that their subscriptions have been cancelled upon stripe payment failure, using the stripe, postgres and mailgun services.',
  tips: [],
  comments: [{
    author: 'Sharkie',
    comment: 'Hey Inkie, can you explain what the psql service is?'
  }, {
    author: 'Inkie',
    comment: "Totally Sharkie! psql is referencing Postgres, the database we're using to store customer information."
  }],
  events: [
    {
      title: "stripe",
      icon: "stripe",
      text: `  Stripe:\n    Email: steve@storyscript.io\n    Plan:  Gold\n`
    },
    {
      title: "stripe",
      icon: "stripe",
      text: `  Stripe:\n    Email: jean@storyscript.io\n    Plan:  Silver\n`
    },
  ],
}

export default stripe
