import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class RssiDeviceLogs extends BaseSchema {
  protected tableName = 'rssi_device_logs'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.integer('device_id')
        .unsigned()
        .references('devices.id')
        .onDelete('SET NULL')

      table.string('rssi', 100)
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
    this.schema.table('devices', (table) => {
      table.string('rssi', 100).after('rebooted')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
