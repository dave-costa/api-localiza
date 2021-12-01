import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import { states } from 'App/utils/'

export default class Tasks extends BaseSchema {
  protected tableName = 'tasks'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name_task')
      table.text('description_task', 'longtext')
      table.string('photo')
      table
        .integer('user_sended_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      //refers to user in column id
      table.enu('state', states).notNullable().defaultTo('doing')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
