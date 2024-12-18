import { ApplicationContract } from '@ioc:Adonis/Core/Application'

export default class AppProvider {
  constructor (protected app: ApplicationContract) {
  }

  public register () {
    // Register your own bindings
  }

  public async boot () {
    // IoC container is ready
  }

  public async ready () {
    if (this.app.environment === 'web') {
      // await import('../start/socket')

      const Scheduler = this.app.container.use('Adonis/Addons/Scheduler')
      Scheduler.run()
    }
  }

  public async shutdown () {
    // Cleanup, since app is going down
  }
}
