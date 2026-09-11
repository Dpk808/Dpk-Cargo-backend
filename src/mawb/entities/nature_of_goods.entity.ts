import { Column, Entity, ManyToOne } from 'typeorm';
import { AppBaseEntity } from '../../common/entities/base.entity';
import { Mawb } from './mawb.entity';


@Entity({ name: 'nature_of_goods', schema: 'mawb' })
export class NatureOfGoods extends AppBaseEntity {
    @Column({ type: 'varchar', length: 100 })
    title: string;

    @Column({ type: 'varchar', length: 100 })
    detail: string;

    @ManyToOne(() => Mawb, (mawb) => mawb.natureOfGoods)
    mawb: Mawb;
}