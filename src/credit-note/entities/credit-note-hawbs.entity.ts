import { Entity, ManyToOne } from "typeorm";
import { AppBaseEntity } from '../../common/entities/base.entity';
import { CreditNote } from "./credit-note.entity";
import { Hawb } from "../../hawb/entities/hawb.entity";

@Entity({ schema: "accounting", name: "credit_note_hawbs" })
export class CreditNoteHawbs extends AppBaseEntity {

  @ManyToOne(() => CreditNote, (cn) => cn.creditNoteHawbs, { nullable: false })
  creditNote: CreditNote;

  @ManyToOne(() => Hawb, { nullable: false })
  hawb: Hawb;
}