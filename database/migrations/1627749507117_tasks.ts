import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Tasks extends BaseSchema {
  protected tableName = 'tasks'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string('week_days').notNullable()
      table.string('time_start').notNullable()
      table.string('time_stop').notNullable()
      table.string('when_stop').nullable()
      table.boolean('active').notNullable()

      table.integer('device_port_id')
        .unsigned()
        .references('device_ports.id')
        .onDelete('cascade')

      table.integer('user_id')
        .unsigned()
        .references('users.id')
        .onDelete('cascade')

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
