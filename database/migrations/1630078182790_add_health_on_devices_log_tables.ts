import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class AddHealthOnDevicesLogTables extends BaseSchema {
  protected tableName = 'device_logs'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('health').after('rebooted')
    })
  }

  public async down () {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('health')
    })
  }
}
