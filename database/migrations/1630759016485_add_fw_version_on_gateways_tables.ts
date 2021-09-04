import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class AddFwVersionOnGatewaysTables extends BaseSchema {
  protected tableName = 'gateways'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('fw_version').nullable().after('rebooted')
    })
  }

  public async down () {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('fw_version')
    })
  }
}
