import { Column, Entity, ObjectIdColumn } from 'typeorm';

@Entity('players')
export class Player {
  constructor(partial: Partial<Player>) {
    Object.assign(this, partial);
  }
  @ObjectIdColumn({ name: 'id' })
  id: string;
  @Column()
  name: string;
  @Column()
  playerNumber: string;
  @Column()
  club: string;
  @Column()
  role: string;
  @Column()
  username: string;
  @Column()
  password: string;
}
