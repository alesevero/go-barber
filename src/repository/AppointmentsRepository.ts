import { EntityRepository, Repository } from 'typeorm'
import Appointment from '../model/Appointment'

@EntityRepository(Appointment)
export default class AppointmentsRepository extends Repository<Appointment> {

  public async isTimeReserved(date: Date, provider: string): Promise<boolean> {
    return await this.findOne({
      where: { date, provider },
    }) ? true : false
  }
}
