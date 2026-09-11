import { Column, Entity, ManyToOne, JoinColumn } from "typeorm";
import { AppBaseEntity } from '../../common/entities/base.entity';
import { CreditNote } from "./credit-note.entity";

@Entity({ schema: "accounting", name: "credit_note_items" })
export class CreditNoteItems extends AppBaseEntity {

    @Column({ type: "int" })
        s_no: number;
      
        @Column({ type: "varchar", length: 255 })
        particulars: string;
      
        @Column({ type: "decimal", precision: 10, scale: 2 })
        amount: number;
    
        @ManyToOne(() => CreditNote, (creditNote) => creditNote.items)
        creditNote: CreditNote;
}