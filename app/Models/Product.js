'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Product extends Model {
  //--------------------------------------------
  static get connection () {
    return 'oldMysql'
  }

  //trecho para conexão com outro banco de dados

  //--------------------------------------------
  //--------------------------------------------
  static get table () {
    return 'produtos'
  }

  //trecho para conexão com a tabela com o nome
  //especificado (não o nome padrão "products")

  //--------------------------------------------
}

module.exports = Product
