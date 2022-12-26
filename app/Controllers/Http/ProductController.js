'use strict'

const Product = use('App/Models/Product')
const Logger = use("Logger")

class ProductController {
  async index () {
    return await Product.all()
  }

  async show ({ params }) {
    const product = await Product.findOrFail(params.id)
    return product
  }

  async store ({ request }) {
    const data = request.only([
      'name',
      'value',
      'quantity'
    ])

    const product = await Product.create(data)

    Logger.info('Produto adicionado!', {
      data: product.toJSON()
    })

    return product
  }

  async update ({ params, request }) {
    const product = await Product.findOrFail(params.id)
    const data = request.only([
      'name',
      'value',
      'quantity'
    ])

    product.merge(data)
    await product.save()
    return product
  }

  async destroy ({ params }) {
    const product = await Product.findOrFail(params.id)
    return await product.delete()
  }
}

module.exports = ProductController