import { IStorySample } from '@/models/StorySample'
import code from './zoom.story'
import defaultCollaborators from './defaultCollaborators'

const zoom: IStorySample = {
  name: 'zoom',
  services: [
    'zoom',
    'http',
    'machinebox',
    'mailgun',
  ],
  stories: ['zoom'],
  code,
  collaborators: defaultCollaborators,
  description:
    'Transcribe your zoom meetings and receive emails when they are ready using the zoom, http, deepspeech and mailgun services.',
  tips: [],
  comments: [],
  events: []
}

export default zoom