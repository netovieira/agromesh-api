import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class GatewayLogs extends BaseSchema {
  protected tableName = 'gateway_logs'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.integer('gateway_id')
           .unsigned()
           .references('gateways.id')
           .onDelete('SET NULL')

      table.string('rebooted').notNullable()
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
