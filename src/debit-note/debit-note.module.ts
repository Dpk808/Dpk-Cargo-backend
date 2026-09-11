import { Module } from '@nestjs/common';
import { DebitNoteService } from './debit-note.service';
import { DebitNoteController } from './debit-note.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DebitNote } from './entities/debit-note.entity';
import { DebitNoteHawbs } from './entities/debit-note-hawbs.entity';
import { DebitNoteItems } from './entities/debit-note-items.entity';

@Module({
imports: [TypeOrmModule.forFeature([DebitNote,DebitNoteItems,DebitNoteHawbs])],
  controllers: [DebitNoteController],
  providers: [DebitNoteService],
})
export class DebitNoteModule {}
