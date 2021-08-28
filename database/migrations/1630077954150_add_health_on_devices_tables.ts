import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class AddHealthOnDevicesTables extends BaseSchema {
  protected tableName = 'devices'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('heath').after('rebooted')
    })
  }

  public async down () {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('heath')
    })
  }
}
