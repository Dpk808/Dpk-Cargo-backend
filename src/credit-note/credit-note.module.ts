import { Module } from '@nestjs/common';
import { CreditNoteService } from './credit-note.service';
import { CreditNoteController } from './credit-note.controller';
import { Type } from 'class-transformer';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreditNote } from './entities/credit-note.entity';
import { CreditNoteItems } from './entities/credit-note-items.entity';
import { CreditNoteHawbs } from './entities/credit-note-hawbs.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CreditNote, CreditNoteItems, CreditNoteHawbs]),],
  controllers: [CreditNoteController],
  providers: [CreditNoteService],
})
export class CreditNoteModule {}
