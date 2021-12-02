import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { User } from 'App/Models'

export default class UserSeeder extends BaseSeeder {
  public async run() {
    await User.createMany([
      {
        id: 1,
        name: 'arthur',
        last_name: 'michael',
        local: 'Vila mariana',
        email: 'arthur.c@gmail.com',

        password: 'secret',
        bi_number: '82347828413',
        photo: 'fafkasndadsaa',
      },
      {
        id: 2,
        name: 'stephanie',
        last_name: 'michael',
        local: 'Vila mariana',
        email: 'stephanie.c@gmail.com',

        password: 'secret',
        bi_number: '82347828413',
        photo: 'fafkasndadsaa',
      },
    ])
  }
}
