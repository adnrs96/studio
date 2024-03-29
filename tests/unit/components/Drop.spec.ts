import { shallowMount, Wrapper } from '@vue/test-utils'
import Drop from '@/components/Drop.vue'
import Directives from '@/directives'

Directives.register()

describe('Drop.vue', () => {
  describe('drop should mount', () => {
    it('should display', () => {
      const drop = shallowMount(Drop, {
        propsData: {
          options: [{ name: 'hello' }]
        }
      })
      expect(drop.html()).toBeTruthy()
      drop.destroy()
    })
  })

  describe('hideIfShown()', () => {
    let navbar: Wrapper<Drop>
    let vm: any

    beforeAll(() => {
      navbar = shallowMount(Drop, {
        propsData: {
          options: [{ name: 'hello' }]
        }
      })
      vm = navbar.vm as any
      vm.show = true
    })

    afterAll(() => {
      navbar.destroy()
    })

    it('should hide', () => {
      expect.assertions(2)
      expect(vm).toHaveProperty('show', true)
      vm.hideIfShown()
      expect(vm).toHaveProperty('show', false)
    })

    it('should do nothing', () => {
      expect.assertions(2)
      expect(vm).toHaveProperty('show', false)
      vm.hideIfShown()
      expect(vm).toHaveProperty('show', false)
    })
  })

  describe('itemClick(item: any)', () => {
    let navbar: Wrapper<Drop>
    let vm: any

    beforeEach(() => {
      navbar = shallowMount(Drop, {
        propsData: {
          options: [{ name: 'hello' }]
        }
      })
      vm = navbar.vm as any
      vm.show = true
    })

    afterEach(() => {
      navbar.destroy()
    })

    it('should emit item.emit', () => {
      expect.assertions(3)
      vm.itemClick({ emit: 'itemClicked' })
      expect(navbar.emitted().selected).toBeTruthy()
      expect(navbar.emitted().selected[0]).toEqual(['itemClicked'])
      expect(vm).toHaveProperty('show', false)
    })

    it('should emit item.emit and keep show=true', () => {
      expect.assertions(3)
      vm.itemClick({ emit: 'itemClicked', keepOpen: true })
      expect(navbar.emitted().selected).toBeTruthy()
      expect(navbar.emitted().selected[0]).toEqual(['itemClicked'])
      expect(vm).toHaveProperty('show', true)
    })

    it('should do nothing', () => {
      expect.assertions(1)
      vm.itemClick(undefined)
      expect(navbar.emitted().selected).toBeFalsy()
    })
  })

  describe('onDisplayChange()', () => {
    it('should call refreshPosition', () => {
      expect.assertions(1)
      const navbar = shallowMount(Drop, {
        propsData: {
          options: [{ name: 'hello' }]
        }
      })
      const vm = navbar.vm as any
      vm.onDisplayChange = jest.fn()
      vm.onDisplayChange()
      expect(vm.onDisplayChange).toHaveBeenCalled()
      navbar.destroy()
    })
  })

  describe('window.listeners', () => {
    it('should call addEventListener/removeEventListener', () => {
      expect.assertions(2)
      window.addEventListener = jest.fn()
      window.removeEventListener = jest.fn()
      const navbar = shallowMount(Drop, {
        propsData: {
          options: [{ name: 'hello' }]
        }
      })
      expect(window.addEventListener).toHaveBeenCalledTimes(2)
      navbar.destroy()
      expect(window.removeEventListener).toHaveBeenCalledTimes(2)
    })
  })

  describe('onModesUpdate()', () => {
    let drop: Wrapper<Drop>
    let vm: any

    beforeEach(() => {
      drop = shallowMount(Drop, {
        propsData: {
          options: [{ name: 'hello' }]
        }
      })
      vm = drop.vm as any
      vm.refreshPosition = jest.fn()
    })

    afterEach(() => {
      drop.destroy()
    })

    it('should set show accordingly', async () => {
      expect.assertions(4)
      vm.modes.click = true
      vm.onModesUpdate()
      await vm.$nextTick()
      expect(vm).toHaveProperty('show', true)
      vm.modes.click = false
      vm.modes.hover = true
      vm.onModesUpdate()
      await vm.$nextTick()
      expect(vm).toHaveProperty('show', true)
      vm.modes.hover = false
      vm.modes.focus = true
      vm.onModesUpdate()
      await vm.$nextTick()
      expect(vm).toHaveProperty('show', true)
      vm.modes.focus = false
      vm.onModesUpdate()
      await vm.$nextTick()
      expect(vm).toHaveProperty('show', false)
    })
  })

  describe('showTrigger()', () => {
    let navbar: Wrapper<Drop>
    let vm: any

    beforeEach(() => {
      navbar = shallowMount(Drop, {
        propsData: {
          options: [{ name: 'hello' }]
        }
      })
      vm = navbar.vm as any
      vm.show = true
      vm.refreshPosition = jest.fn()
    })

    afterEach(() => {
      navbar.destroy()
    })

    it('should set show=false', async () => {
      expect.assertions(2)
      expect(vm).toHaveProperty('show', true)
      vm.showTrigger('click', false)
      vm.onModesUpdate()
      navbar.vm.$nextTick().then(() => {
        expect(vm).toHaveProperty('show', false)
      })
    })

    it('should let show as is', () => {
      expect.assertions(3)
      vm.show = true
      expect(vm).toHaveProperty('show', true)
      vm.showTrigger('hover', false)
      expect(vm.refreshPosition).not.toHaveBeenCalled()
      expect(vm).toHaveProperty('show', true)
    })
  })

  describe('refreshPosition()', () => {
    it('currentPosition should be changed to [bottom, right]', async () => {
      expect.assertions(1)
      const navbar = shallowMount(Drop, {
        propsData: {
          options: [{ name: 'hello' }]
        }
      })
      const vm = navbar.vm as any
      vm.show = true
      vm.$refs.self.getBoundingClientRect = jest.fn().mockImplementation(() => ({ top: 700, left: 550, bottom: 710, right: 570 }))
      vm.refreshPosition()
      navbar.vm.$nextTick().then(() => {
        expect(vm).toHaveProperty('currentPosition', ['bottom', 'right'])
        navbar.destroy()
      })
    })

    it('currentPosition should be changed to [bottom, left]', async () => {
      expect.assertions(1)
      const navbar = shallowMount(Drop, {
        propsData: {
          options: [{ name: 'hello' }]
        }
      })
      const vm = navbar.vm as any
      vm.show = true
      vm.$refs.self.getBoundingClientRect = jest.fn().mockImplementation(() => ({ top: 700, left: 400, bottom: 710, right: 450 }))
      vm.refreshPosition()
      navbar.vm.$nextTick().then(() => {
        expect(vm).toHaveProperty('currentPosition', ['bottom', 'left'])
        navbar.destroy()
      })
    })

    it('currentPosition should be changed to [top, right]', async () => {
      expect.assertions(1)
      const navbar = shallowMount(Drop, {
        propsData: {
          options: [{ name: 'hello' }]
        }
      })
      const vm = navbar.vm as any
      vm.show = true
      vm.$refs.self.getBoundingClientRect = jest.fn().mockImplementation(() => ({ top: 40, left: 550, bottom: 50, right: 570 }))
      vm.refreshPosition()
      navbar.vm.$nextTick().then(() => {
        expect(vm).toHaveProperty('currentPosition', ['top', 'right'])
        navbar.destroy()
      })
    })

    it('currentPosition should be changed to [top, left]', async () => {
      expect.assertions(1)
      const navbar = shallowMount(Drop, {
        propsData: {
          options: [{ name: 'hello' }]
        }
      })
      const vm = navbar.vm as any
      vm.show = true
      vm.$refs.self.getBoundingClientRect = jest.fn().mockImplementation(() => ({ top: 40, left: 400, bottom: 50, right: 450 }))
      vm.refreshPosition()
      navbar.vm.$nextTick().then(() => {
        expect(vm).toHaveProperty('currentPosition', ['top', 'left'])
        navbar.destroy()
      })
    })

    it('currentPosition should be changed to [left, top]', async () => {
      expect.assertions(1)
      const navbar = shallowMount(Drop, {
        propsData: {
          options: [{ name: 'hello' }]
        }
      })
      const vm = navbar.vm as any
      vm.show = true
      vm.$refs.self.getBoundingClientRect = jest.fn().mockImplementation(() => ({ top: 10, left: 10, bottom: 50, right: 50 }))
      vm.refreshPosition()
      navbar.vm.$nextTick().then(() => {
        expect(vm).toHaveProperty('currentPosition', ['left', 'top'])
        navbar.destroy()
      })
    })

    it('currentPosition should be changed to [left, bottom]', async () => {
      expect.assertions(1)
      const navbar = shallowMount(Drop, {
        propsData: {
          options: [{ name: 'hello' }]
        }
      })
      const vm = navbar.vm as any
      vm.show = true
      vm.$refs.self.getBoundingClientRect = jest.fn().mockImplementation(() => ({ top: 700, left: 10, bottom: 750, right: 50 }))
      vm.refreshPosition()
      navbar.vm.$nextTick().then(() => {
        expect(vm).toHaveProperty('currentPosition', ['left', 'bottom'])
        navbar.destroy()
      })
    })

    it('currentPosition should be changed to [right, top]', async () => {
      expect.assertions(1)
      const navbar = shallowMount(Drop, {
        propsData: {
          options: [{ name: 'hello' }]
        }
      })
      const vm = navbar.vm as any
      vm.show = true
      vm.$refs.self.getBoundingClientRect = jest.fn().mockImplementation(() => ({ top: 10, left: 900, bottom: 50, right: 950 }))
      vm.refreshPosition()
      navbar.vm.$nextTick().then(() => {
        expect(vm).toHaveProperty('currentPosition', ['right', 'top'])
        navbar.destroy()
      })
    })

    it('currentPosition should be changed to [right, bottom]', async () => {
      expect.assertions(1)
      const navbar = shallowMount(Drop, {
        propsData: {
          options: [{ name: 'hello' }]
        }
      })
      const vm = navbar.vm as any
      vm.show = true
      vm.$refs.self.getBoundingClientRect = jest.fn().mockImplementation(() => ({ top: 700, left: 900, bottom: 750, right: 950 }))
      vm.refreshPosition()
      navbar.vm.$nextTick().then(() => {
        expect(vm).toHaveProperty('currentPosition', ['right', 'bottom'])
        navbar.destroy()
      })
    })

    it('currentPosition should be changed to [bottom, right] using props', async () => {
      expect.assertions(1)
      const navbar = shallowMount(Drop, {
        propsData: {
          up: true,
          arrowright: true,
          options: [{ name: 'hello' }]
        }
      })
      const vm = navbar.vm as any
      vm.show = true
      vm.$refs.self.getBoundingClientRect = jest.fn().mockImplementation(() => ({ top: 40, left: 400, bottom: 50, right: 450 }))
      vm.refreshPosition()
      navbar.vm.$nextTick().then(() => {
        expect(vm).toHaveProperty('currentPosition', ['bottom', 'right'])
        navbar.destroy()
      })
    })

    it('currentPosition should be changed to [bottom, left]', async () => {
      expect.assertions(1)
      const navbar = shallowMount(Drop, {
        propsData: {
          up: true,
          arrowleft: true,
          options: [{ name: 'hello' }]
        }
      })
      const vm = navbar.vm as any
      vm.show = true
      vm.$refs.self.getBoundingClientRect = jest.fn().mockImplementation(() => ({ top: 40, left: 550, bottom: 50, right: 570 }))
      vm.refreshPosition()
      navbar.vm.$nextTick().then(() => {
        expect(vm).toHaveProperty('currentPosition', ['bottom', 'left'])
        navbar.destroy()
      })
    })

    it('currentPosition should be changed to [top, right]', async () => {
      expect.assertions(1)
      const navbar = shallowMount(Drop, {
        propsData: {
          down: true,
          arrowright: true,
          options: [{ name: 'hello' }]
        }
      })
      const vm = navbar.vm as any
      vm.show = true
      vm.$refs.self.getBoundingClientRect = jest.fn().mockImplementation(() => ({ top: 700, left: 400, bottom: 710, right: 450 }))
      vm.refreshPosition()
      navbar.vm.$nextTick().then(() => {
        expect(vm).toHaveProperty('currentPosition', ['top', 'right'])
        navbar.destroy()
      })
    })

    it('currentPosition should be changed to [top, left]', async () => {
      expect.assertions(1)
      const navbar = shallowMount(Drop, {
        propsData: {
          down: true,
          arrowleft: true,
          options: [{ name: 'hello' }]
        }
      })
      const vm = navbar.vm as any
      vm.show = true
      vm.$refs.self.getBoundingClientRect = jest.fn().mockImplementation(() => ({ top: 700, left: 550, bottom: 710, right: 570 }))
      vm.refreshPosition()
      navbar.vm.$nextTick().then(() => {
        expect(vm).toHaveProperty('currentPosition', ['top', 'left'])
        navbar.destroy()
      })
    })

    it('currentPosition should be changed to [left, top]', async () => {
      expect.assertions(1)
      const navbar = shallowMount(Drop, {
        propsData: {
          right: true,
          arrowup: true,
          options: [{ name: 'hello' }]
        }
      })
      const vm = navbar.vm as any
      vm.show = true
      vm.$refs.self.getBoundingClientRect = jest.fn().mockImplementation(() => ({ top: 700, left: 900, bottom: 750, right: 950 }))
      vm.refreshPosition()
      navbar.vm.$nextTick().then(() => {
        expect(vm).toHaveProperty('currentPosition', ['left', 'top'])
        navbar.destroy()
      })
    })

    it('currentPosition should be changed to [left, bottom]', async () => {
      expect.assertions(1)
      const navbar = shallowMount(Drop, {
        propsData: {
          right: true,
          arrowdown: true,
          options: [{ name: 'hello' }]
        }
      })
      const vm = navbar.vm as any
      vm.show = true
      vm.$refs.self.getBoundingClientRect = jest.fn().mockImplementation(() => ({ top: 10, left: 900, bottom: 50, right: 950 }))
      vm.refreshPosition()
      navbar.vm.$nextTick().then(() => {
        expect(vm).toHaveProperty('currentPosition', ['left', 'bottom'])
        navbar.destroy()
      })
    })

    it('currentPosition should be changed to [right, top]', async () => {
      expect.assertions(1)
      const navbar = shallowMount(Drop, {
        propsData: {
          left: true,
          arrowup: true,
          options: [{ name: 'hello' }]
        }
      })
      const vm = navbar.vm as any
      vm.show = true
      vm.$refs.self.getBoundingClientRect = jest.fn().mockImplementation(() => ({ top: 700, left: 10, bottom: 750, right: 50 }))
      vm.refreshPosition()
      navbar.vm.$nextTick().then(() => {
        expect(vm).toHaveProperty('currentPosition', ['right', 'top'])
        navbar.destroy()
      })
    })

    it('currentPosition should be changed to [right, bottom]', async () => {
      expect.assertions(1)
      const navbar = shallowMount(Drop, {
        propsData: {
          left: true,
          arrowdown: true,
          options: [{ name: 'hello' }]
        }
      })
      const vm = navbar.vm as any
      vm.show = true
      vm.$refs.self.getBoundingClientRect = jest.fn().mockImplementation(() => ({ top: 10, left: 10, bottom: 50, right: 50 }))
      vm.refreshPosition()
      navbar.vm.$nextTick().then(() => {
        expect(vm).toHaveProperty('currentPosition', ['right', 'bottom'])
        navbar.destroy()
      })
    })

    it('buttonSize should be 24', async () => {
      expect.assertions(1)
      const navbar = shallowMount(Drop, {
        propsData: {
          options: [{ name: 'hello' }]
        }
      })
      const vm = navbar.vm as any
      vm.show = true
      vm.$refs.self = { getBoundingClientRect: () => ({ top: 0, left: 0, right: 0 }), clientWidth: 10000 }
      vm.refreshPosition()
      navbar.vm.$nextTick().then(() => {
        expect(vm).toHaveProperty('buttonSize', 24)
        navbar.destroy()
      })
    })
  })
})
