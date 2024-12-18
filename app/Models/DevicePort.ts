import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Device from './Device'

export default class DevicePort extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public deviceId: number

  @column()
  public port: number

  @column()
  public state: boolean

  @column()
  public manual: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Device)
  public device: BelongsTo<typeof Device>
}
