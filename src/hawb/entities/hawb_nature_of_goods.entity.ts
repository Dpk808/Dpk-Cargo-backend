import { Column, Entity, ManyToOne } from 'typeorm';
import { AppBaseEntity } from '../../common/entities/base.entity';
import { Hawb } from './hawb.entity';


@Entity({ name: 'hawb_nature_of_goods', schema: 'mawb' })
export class HawbNatureOfGoods extends AppBaseEntity {
    @Column({ type: 'varchar', length: 100 })
    title: string;

    @Column({ type: 'varchar', length: 100 })
    detail: string;

    @ManyToOne(() => Hawb, (hawb) => hawb.natureOfGoods)
    hawb: Hawb;
}