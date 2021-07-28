import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import DevicePort from './DevicePort'

export default class DevicePortLog extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public devicePortId: number

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

  @belongsTo(() => DevicePort)
  public devicePort: BelongsTo<typeof DevicePort>
}
