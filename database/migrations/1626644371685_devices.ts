import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Devices extends BaseSchema {
  protected tableName = 'devices'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      
      table.integer('gateway_id')
      .unsigned()
      .references('gateways.id')
      .onDelete('CASCADE')

      table.string('code').notNullable()
      table.boolean('rebooted').notNullable()
      table.json('info').nullable()

      table.unique(['gateway_id', 'code'])

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
