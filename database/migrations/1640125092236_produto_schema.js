'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProdutoSchema extends Schema {
  //--------------------------------
  static get connection () {
    return 'oldMysql'
  }
  
  //este trecho faz a migration ser executada 
  //no banco de dados descrito, não no
  //banco de dados padrão como as outras
  
  //--------------------------------

  up () {
    this.create('produtos', (table) => {
      table.increments()
      table.string('name', 60).notNullable()
      table.decimal('value', [10, 2]).notNullable() //[total de dígitos, dígitos depois da vírgula]
      table.integer('quantity').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('produtos')
  }
}

module.exports = ProdutoSchema
