import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Well from 'App/Models/Well';

export default class WellController {

  public async index ({auth}: HttpContextContract) {
    return await Well.query().where('user_id', auth.user?.id || -1)
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
