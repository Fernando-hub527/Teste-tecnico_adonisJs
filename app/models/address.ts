import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Address extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare country: string

  @column()
  declare state: string

  @column()
  declare city: string

  @column()
  declare neighborhood: string

  @column()
  declare street: string

  @column()
  declare number: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime
}