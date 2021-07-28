import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class DevicePortLogs extends BaseSchema {
  protected tableName = 'device_port_logs'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()

      table.integer('device_port_id')
      .unsigned()
      .references('device_ports.id')
        .onDelete('SET NULL')


      table.integer('port').notNullable()
      table.boolean('state').notNullable()
      table.boolean('manual').notNullable()

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
