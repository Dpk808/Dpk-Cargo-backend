import { Entity, ManyToOne } from "typeorm";
import { AppBaseEntity } from '../../common/entities/base.entity';
import { DebitNote } from "./debit-note.entity";
import { Hawb } from "../../hawb/entities/hawb.entity";

@Entity({ schema: "accounting", name: "debit_note_hawbs" })
export class DebitNoteHawbs extends AppBaseEntity {

  @ManyToOne(() => DebitNote, (dn) => dn.debitNoteHawbs, { nullable: false })
  debitNote: DebitNote;

//    @ManyToOne(() => Mawb, (mawb) => mawb.dimensions)
//     mawb: Mawb;

  @ManyToOne(() => Hawb, { nullable: false })
  hawb: Hawb;
}