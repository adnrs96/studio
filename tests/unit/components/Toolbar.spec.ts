import { shallowMount, Wrapper } from '@vue/test-utils'
import Toolbar from '@internal/components/Toolbar.vue'

describe('Toolbar.vue', () => {
  let toolbar: Wrapper<Toolbar>

  beforeEach(() => {
    toolbar = shallowMount(Toolbar, {
      mocks: {
        $route: {
          name: 'welcome'
        }
      },
      stubs: {
        's-icon': '<div />',
        's-text': '<div />'
      }
    })
  })

  afterEach(() => {
    toolbar.destroy()
  })

  it('should display', () => {
    expect(toolbar.html()).toBeTruthy()
  })
})
