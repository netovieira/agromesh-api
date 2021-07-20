import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Wells extends BaseSchema {
  protected tableName = 'wells'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.integer('user_id')
      .unsigned()
      .references('users.id')
      .onDelete('CASCADE') 

      table.integer('device_port_id')
      .nullable()
      .unsigned()
      .references('device_ports.id')
      .onDelete('set null') 

      table.string('name').notNullable()
      table.string('latitude').nullable()
      table.string('longitude').nullable()
      
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
