import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class DevicePorts extends BaseSchema {
  protected tableName = 'device_ports'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()

      table.integer('device_id')
      .unsigned()
      .references('devices.id')
      .onDelete('CASCADE')

      table.integer('port').notNullable()
      table.boolean('state').notNullable()
      table.boolean('manual').notNullable()

      table.unique(['device_id', 'port'])
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
