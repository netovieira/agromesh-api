import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Gateway from './Gateway'
import DevicePort from './DevicePort'

export default class Device extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public gatewayId: number

  @column()
  public code: string

  @column()
  public info: object

  @column()
  public rebooted: string

  @column()
  public rssi: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Gateway)
  public gateway: BelongsTo<typeof Gateway>

  @hasMany(() => DevicePort)
  public devicePorts: HasMany<typeof DevicePort>
}
