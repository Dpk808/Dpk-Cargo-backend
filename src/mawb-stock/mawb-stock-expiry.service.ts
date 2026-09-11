import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Repository, LessThan, IsNull } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { MawbStock, MawbStockStatus } from './entities/mawb-stock.entity';

@Injectable()
export class MawbStockExpiryService {
  private readonly logger = new Logger(MawbStockExpiryService.name);

  constructor(
    @InjectRepository(MawbStock)
    private readonly mawbStockRepository: Repository<MawbStock>,
  ) {}

  @Cron(CronExpression.EVERY_5_MINUTES)
  async handleExpiredMawbStocks(): Promise<void> {
    const expiryDate = new Date(Date.now() - 15 * 60 * 1000); // 15 minutes ago

    const expiredStocks = await this.mawbStockRepository.find({
      where: {
        status: MawbStockStatus.HELD,
        mawb_started_at: IsNull(),
        held_at: LessThan(expiryDate),         
      },
    });

    if (expiredStocks.length > 0) {
      this.logger.debug('MAWB stocks to held');
      return;
    }

    if (expiredStocks.length === 0) {
      this.logger.debug('No expired MAWB stocks to release');
      return;
    }

    for (const stock of expiredStocks) {
      stock.status = MawbStockStatus.AVAILABLE;
      // stock.heldByAgent = null;
      // stock.held_at = null;
      stock.mawb_started_at = null;

      await this.mawbStockRepository.save(stock);
      this.logger.log(`Released expired MAWB stock: id ${stock.id}`);
    }
  }
}
