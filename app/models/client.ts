import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Sale from './sale.js'

export default class Client extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @hasMany(() => Sale)
  declare sales: HasMany<typeof Sale>

  @column()
  declare cpf: string

  @column()
  declare name: string
  
  @column()
  declare telephone: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}