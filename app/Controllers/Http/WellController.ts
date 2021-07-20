import { AuthContract } from '@ioc:Adonis/Addons/Auth';
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User';
import Well from 'App/Models/Well';

export default class WellsController {

  public async index ({auth}: HttpContextContract) {
    const user: User = auth.user?
    return await Well.query().where('user_id', user.id)
  }

  public async create ({}: HttpContextContract) {
  }

  public async store ({}: HttpContextContract) {
  }

  public async show ({}: HttpContextContract) {
  }

  public async edit ({}: HttpContextContract) {
  }

  public async update ({}: HttpContextContract) {
  }

  public async destroy ({}: HttpContextContract) {
  }
}
