import { DateTime } from 'luxon'
import { afterSave, BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Device from './Device'
import DevicePortLog from './DevicePortLog'

export default class DevicePort extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public deviceId: number

  @column()
  public port: string

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

  @afterSave()
  public static async saveLog (devicePort: DevicePort) {
    const log = new DevicePortLog()
    log.port = devicePort.port
    log.state = devicePort.state
    log.manual = devicePort.manual
    log.related('devicePort').associate(devicePort)
    log.save()
  }
}
