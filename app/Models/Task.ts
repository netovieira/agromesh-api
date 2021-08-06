import { DateTime } from 'luxon'
import {BaseModel, belongsTo, BelongsTo, column} from '@ioc:Adonis/Lucid/Orm'
import DevicePort from "App/Models/DevicePort";
import User from "App/Models/User";

export default class Task extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public userId: number

  @column()
  public devicePortId: number

  @column()
  public week_days: string //MON,TUE,WED,THU,FRI,SAT,SUN

  @column()
  public time_start: string

  @column()
  public time_stop: string

  @column()
  public when_stop: string

  @column()
  public active: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => DevicePort)
  public devicePort: BelongsTo<typeof DevicePort>

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>
}
