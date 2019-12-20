import Layout from '@app/Layout/index.vue'
import { Wrapper, shallowMount, createLocalVue } from '@vue/test-utils'
import samples from '@/samples'
import Vuex, { Store } from 'vuex'
import StorePayload from '@app/store/modules/Payload'
import StoreTips from '@app/store/modules/Tips'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('Layout index', () => {
  let layout: Wrapper<Layout>
  let store: Store<any>

  beforeEach(() => {
    store = new Vuex.Store({
      state: { ...StorePayload.state, ...StoreTips.state },
      getters: { ...StorePayload.getters, ...StoreTips.getters },
      mutations: { ...StorePayload.mutations, ...StoreTips.mutations }
    })
    layout = shallowMount(Layout, {
      stubs: {
        'router-view': '<div />',
        's-text': '<div />',
        's-icon': '<div />'
      },
      mocks: {
        $route: {
          path: '/example/test'
        },
        $router: {
          push: jest.fn(),
          replace: jest.fn()
        }
      },
      propsData: {
        sample: ''
      },
      store,
      localVue
    })
  })

  afterEach(() => {
    layout.destroy()
  })

  it('should mount', () => {
    expect.assertions(1)
    expect(layout.html()).toBeDefined()
  })

  it('should skip intro', () => {
    expect.assertions(1)
    const view = shallowMount(Layout, {
      propsData: {
        sample: 'not-a-sample'
      },
      store,
      localVue,
      mocks: {
        $route: {
          query: { skipIntro: 'true' }
        },
        $router: {
          push: jest.fn(),
          replace: jest.fn()
        }
      },
      stubs: {
        's-text': '<div />',
        's-icon': '<div />'
      }
    })
    expect(view.vm).toHaveProperty('isIntro', false)
    view.destroy()
  })

  describe('.setPayload(string)', () => {
    it('should set the payload', () => {
      const view = shallowMount(Layout, {
        store,
        localVue,
        propsData: {
          sample: 'counter'
        },
        mocks: {
          $route: {
            query: { skipIntro: 'true' }
          },
          $router: {
            push: jest.fn(),
            replace: jest.fn()
          }
        },
        stubs: {
          's-text': '<div />',
          's-icon': '<div />'
        }
      })
      const vvm = view.vm as any

      expect.assertions(1)
      store.commit = jest.fn()
      vvm.setPayload('counter')
      expect(vvm).toHaveProperty('payload', samples.counter)
      view.destroy()
    })
  })
})