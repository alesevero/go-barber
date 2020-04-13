import { uuid } from 'uuidv4';

export default class Appointment {
  id: string;

  provider: string;

  date: Date;

  constructor(provider: string, date: Date) {
    this.provider = provider;
    this.date = date;
    this.id = uuid();
  }
}
