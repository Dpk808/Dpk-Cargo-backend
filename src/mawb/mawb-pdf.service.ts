import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Mawb } from './entities/mawb.entity';
import * as fs from 'fs';
import * as path from 'path';
import puppeteer from 'puppeteer';

@Injectable()
export class MawbPdfService {
  constructor(
    @InjectRepository(Mawb)
    private readonly mawbRepo: Repository<Mawb>,
  ) {}

  /**
   * Generate a PDF for the given MAWB ID.
   * Reads the SVG template, injects data as positioned text overlays,
   * and renders to PDF via Puppeteer.
   */
  async generatePdf(id: number): Promise<Buffer> {
    // 1. Fetch the full MAWB record with all relations
    const mawb = await this.mawbRepo.findOne({
      where: { id },
      relations: [
        'shipper',
        'consignee',
        'agent',
        'airport',
        'accounting',
        'billing',
        'dimensions',
        'otherCharge',
        'natureOfGoods',
      ],
    });

    if (!mawb) {
      throw new NotFoundException(`MAWB with id ${id} not found`);
    }

    // 2. Read the SVG template
    const templatePath = path.join(
      __dirname,
      'templates',
      'mawb_template.svg',
    );
    let svgContent = fs.readFileSync(templatePath, 'utf-8');

    // 3. Build data overlay and inject before closing </svg>
    const dataOverlay = this.buildDataOverlay(mawb);
    svgContent = svgContent.replace('</svg>', `${dataOverlay}\n</svg>`);

    // 4. Wrap in HTML
    const html = this.wrapInHtml(svgContent);

    // 5. Render to PDF with Puppeteer
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    try {
      const page = await browser.newPage();
      await page.setContent(html, { waitUntil: 'domcontentloaded' });

      const pdfBuffer = await page.pdf({
        format: 'A4',
        printBackground: true,
        margin: { top: '0', right: '0', bottom: '0', left: '0' },
      });

      return Buffer.from(pdfBuffer);
    } finally {
      await browser.close();
    }
  }

  /**
   * Wrap SVG content in a minimal HTML page sized for A4 printing.
   */
  private wrapInHtml(svgContent: string): string {
    return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    @page { size: A4; margin: 0; }
    body {
      width: 210mm;
      height: 297mm;
      margin: 0;
      padding: 0;
    }
    svg {
      width: 210mm;
      height: 297mm;
      display: block;
    }
  </style>
</head>
<body>
  ${svgContent}
</body>
</html>`;
  }

  /**
   * Build SVG <text> elements positioned over the template fields.
   * All coordinates are in mm matching the SVG viewBox (0 0 210 297).
   */
  private buildDataOverlay(mawb: Mawb): string {
    const texts: string[] = [];

    // Helper: create a positioned SVG text element
    const addText = (
      x: number,
      y: number,
      value: string | number | null | undefined,
      opts: {
        fontSize?: number;
        fontWeight?: string;
        maxWidth?: number;
        anchor?: string;
      } = {},
    ) => {
      if (value === null || value === undefined || value === '') return;
      const fontSize = opts.fontSize ?? 2.8;
      const fontWeight = opts.fontWeight ?? 'normal';
      const anchor = opts.anchor ?? 'start';
      const escaped = String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');

      texts.push(
        `<text x="${x}" y="${y}" ` +
          `style="font-family:Arial,sans-serif;font-size:${fontSize}px;font-weight:${fontWeight};text-anchor:${anchor};fill:#000000"` +
          `>${escaped}</text>`,
      );
    };

    // Helper: add multi-line text (splits by \n or wraps long lines)
    const addMultiLine = (
      x: number,
      startY: number,
      lines: string[],
      lineHeight: number = 3.2,
      fontSize: number = 2.8,
    ) => {
      lines.forEach((line, i) => {
        if (line) {
          addText(x, startY + i * lineHeight, line, { fontSize });
        }
      });
    };

    // ========================================
    // AWB Number (top-right area)
    // ========================================
    const awbNumber = `${mawb.airline_prefix}-${mawb.serial_no}${mawb.check_digit}`;
    addText(155, 18, awbNumber, { fontSize: 4.5, fontWeight: 'bold' });

    // ========================================
    // Shipper's Name and Address (top-left box)
    // Field area: ~x:16-65, y:24-47
    // ========================================
    if (mawb.shipper) {
      addMultiLine(17, 29, [
        mawb.shipper.name,
        mawb.shipper.address,
        `${mawb.shipper.city}, ${mawb.shipper.country}`,
        mawb.shipper.poBoxNumber
          ? `P.O. Box: ${mawb.shipper.poBoxNumber}`
          : '',
        mawb.shipper.phoneNumber
          ? `Tel: ${mawb.shipper.phoneNumber}`
          : '',
      ]);
    }

    // Shipper's Account Number
    if (mawb.shipper?.poBoxNumber) {
      addText(68, 29, mawb.shipper.poBoxNumber);
    }

    // ========================================
    // Consignee's Name and Address
    // Field area: ~x:16-65, y:49-72
    // ========================================
    if (mawb.consignee) {
      addMultiLine(17, 54, [
        mawb.consignee.name,
        mawb.consignee.address,
        `${mawb.consignee.city}, ${mawb.consignee.country}`,
        mawb.consignee.poBoxNumber
          ? `P.O. Box: ${mawb.consignee.poBoxNumber}`
          : '',
        mawb.consignee.phoneNumber
          ? `Tel: ${mawb.consignee.phoneNumber}`
          : '',
      ]);
    }

    // Consignee's Account Number
    if (mawb.consignee?.poBoxNumber) {
      addText(68, 54, mawb.consignee.poBoxNumber);
    }

    // ========================================
    // Issuing Carrier's Agent Name and City
    // Field area: ~x:16-105, y:75-89
    // ========================================
    if (mawb.agent) {
      addMultiLine(17, 79, [
        mawb.agent.name,
        `${mawb.agent.city}, ${mawb.agent.country}`,
      ]);

      // Agent's IATA Code
      addText(17, 95, mawb.agent.IATA_code);
    }

    // Account No.
    addText(62, 95, mawb.account_no);

    // ========================================
    // Accounting Information (right side box)
    // Field area: ~x:106-200, y:75-97
    // ========================================
    if (mawb.accounting) {
      addText(107, 79, mawb.accounting.reference_number);
      if (mawb.accounting.is_prepaid) {
        addText(107, 83, 'PREPAID');
      }
      if (mawb.accounting.is_collect) {
        addText(130, 83, 'COLLECT');
      }
    }

    // ========================================
    // Airport of Departure
    // Field area: ~x:16-105, y:97-105
    // ========================================
    if (mawb.airport) {
      addText(17, 103, mawb.airport.departure, { fontSize: 3 });
    }

    // ========================================
    // Routing: To / By First Carrier / to / by / to / by
    // Field area: ~x:16-105, y:105-113
    // ========================================
    if (mawb.airport) {
      // To (first)
      addText(17, 112, mawb.airport.to, { fontSize: 3 });
      // By First Carrier
      addText(26, 112, mawb.airport.by_first_carrier, { fontSize: 3 });

      // Second routing
      addText(71, 112, mawb.airport.second_to, { fontSize: 3 });
      addText(81, 112, mawb.airport.second_by, { fontSize: 3 });

      // Third routing
      addText(89, 112, mawb.airport.third_to, { fontSize: 3 });
      addText(99, 112, mawb.airport.third_by, { fontSize: 3 });
    }

    // ========================================
    // Currency, CHGS code, WT/VAL, Other (PPD/COLL)
    // Field area: ~x:105-140, y:105-113
    // ========================================
    if (mawb.accounting) {
      addText(107, 112, mawb.accounting.currency, { fontSize: 3 });
      addText(116, 112, mawb.accounting.chgs_code, { fontSize: 2.5 });

      // WT/VAL PPD checkbox
      if (mawb.accounting.wt_val_ppd) {
        addText(122, 112, 'X', { fontSize: 2.8 });
      }
      // WT/VAL COLL checkbox
      if (mawb.accounting.wt_val_coll) {
        addText(127, 112, 'X', { fontSize: 2.8 });
      }
      // Other PPD checkbox
      if (mawb.accounting.other_ppd) {
        addText(132, 112, 'X', { fontSize: 2.8 });
      }
      // Other COLL checkbox
      if (mawb.accounting.other_coll) {
        addText(137, 112, 'X', { fontSize: 2.8 });
      }

      // Declared Value for Carriage
      addText(
        141,
        112,
        mawb.accounting.declared_value_carriage != null
          ? Number(mawb.accounting.declared_value_carriage).toFixed(2)
          : 'NVD',
        { fontSize: 2.8 },
      );

      // Declared Value for Customs
      addText(
        171,
        112,
        mawb.accounting.declared_value_customs != null
          ? Number(mawb.accounting.declared_value_customs).toFixed(2)
          : 'NCV',
        { fontSize: 2.8 },
      );
    }

    // ========================================
    // Airport of Destination & Flight Date
    // Field area: ~x:16-105, y:113-122
    // ========================================
    if (mawb.airport) {
      addText(27, 120, mawb.airport.destination, { fontSize: 3 });

      // Flight date
      if (mawb.airport.flight_date) {
        const fd = new Date(mawb.airport.flight_date);
        addText(
          72,
          120,
          fd.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
          }),
          { fontSize: 2.8 },
        );
      }
    }

    // Amount of Insurance
    if (mawb.accounting?.insurance_amt != null) {
      addText(
        108,
        120,
        Number(mawb.accounting.insurance_amt).toFixed(2),
        { fontSize: 2.8 },
      );
    }

    // ========================================
    // Handling Information
    // Field area: ~x:16-200, y:122-139
    // ========================================
    if (mawb.information) {
      const infoLines = mawb.information.split('\n').slice(0, 4);
      addMultiLine(17, 128, infoLines, 3.5, 2.8);
    }

    // ========================================
    // Shipment Details Table Row
    // Field area: y:139-206 (main cargo description area)
    // ========================================

    // No. of Pieces RCP
    addText(19, 152, mawb.no_of_pieces, { fontSize: 3, anchor: 'middle' });

    // Gross Weight
    addText(33, 152, Number(mawb.gross_weight).toFixed(2), {
      fontSize: 3,
      anchor: 'middle',
    });

    // Weight Unit (kg/lb)
    addText(44, 152, mawb.unit, { fontSize: 2.5, anchor: 'middle' });

    // Rate Class
    addText(54, 152, mawb.rate_class, { fontSize: 3, anchor: 'middle' });

    // Commodity Item No
    addText(54, 156, mawb.commodity_item_no, {
      fontSize: 2.2,
      anchor: 'middle',
    });

    // Chargeable Weight
    addText(78, 152, Number(mawb.chargable_weight).toFixed(2), {
      fontSize: 3,
      anchor: 'middle',
    });

    // Rate / Charge
    addText(94, 152, Number(mawb.rate).toFixed(2), {
      fontSize: 3,
      anchor: 'middle',
    });

    // Total
    addText(127, 152, Number(mawb.total).toFixed(2), {
      fontSize: 3,
      anchor: 'middle',
    });

    // ========================================
    // Nature of Goods (incl. Dimensions and Volume)
    // Field area: ~x:145-200, y:148-200
    // ========================================
    let goodsY = 152;

    if (mawb.natureOfGoods && mawb.natureOfGoods.length > 0) {
      mawb.natureOfGoods.forEach((nog) => {
        addText(146, goodsY, `${nog.title}: ${nog.detail}`, {
          fontSize: 2.5,
        });
        goodsY += 3.2;
      });
    }

    // Dimensions
    if (mawb.dimensions && mawb.dimensions.length > 0) {
      goodsY += 1;
      addText(146, goodsY, 'Dimensions:', { fontSize: 2.2 });
      goodsY += 3;
      const dimUnit = mawb.dimension_unit || 'CM';
      mawb.dimensions.forEach((dim) => {
        addText(
          146,
          goodsY,
          `${Number(dim.length).toFixed(1)} × ${Number(dim.width).toFixed(1)} × ${Number(dim.height).toFixed(1)} ${dimUnit}`,
          { fontSize: 2.2 },
        );
        goodsY += 2.8;
      });
    }

    // ========================================
    // Other Charges
    // Field area: ~x:86-200, y:206-231
    // ========================================
    if (mawb.otherCharge && mawb.otherCharge.length > 0) {
      let chargeY = 212;
      mawb.otherCharge.forEach((charge) => {
        const typeLabel = charge.type === 'AGENT' ? 'A' : 'C';
        addText(
          87,
          chargeY,
          `${typeLabel} - ${charge.name}: ${Number(charge.amount).toFixed(2)}`,
          { fontSize: 2.5 },
        );
        chargeY += 3;
      });
    }

    // ========================================
    // Billing / Charges Summary (left bottom section)
    // ========================================
    if (mawb.billing) {
      // Weight Charge (Prepaid column ~x:25, Collect column ~x:62)
      addText(25, 212, Number(mawb.billing.weight_charge).toFixed(2), {
        fontSize: 2.8,
        anchor: 'middle',
      });

      // Valuation Charge
      if (mawb.billing.valuation_charge != null) {
        addText(
          25,
          220,
          Number(mawb.billing.valuation_charge).toFixed(2),
          { fontSize: 2.8, anchor: 'middle' },
        );
      }

      // Tax
      if (mawb.billing.tax != null) {
        addText(25, 228, Number(mawb.billing.tax).toFixed(2), {
          fontSize: 2.8,
          anchor: 'middle',
        });
      }

      // Total Other Charges Due Agent
      if (mawb.billing.total_charge_agent != null) {
        addText(
          50,
          237,
          Number(mawb.billing.total_charge_agent).toFixed(2),
          { fontSize: 2.8, anchor: 'middle' },
        );
      }

      // Total Other Charges Due Carrier
      if (mawb.billing.total_charge_carrier != null) {
        addText(
          50,
          245,
          Number(mawb.billing.total_charge_carrier).toFixed(2),
          { fontSize: 2.8, anchor: 'middle' },
        );
      }

      // Total Prepaid
      addText(32, 262, Number(mawb.billing.total).toFixed(2), {
        fontSize: 3,
        anchor: 'middle',
        fontWeight: 'bold',
      });

      // Executed on (date)
      if (mawb.billing.executed_date) {
        const ed = new Date(mawb.billing.executed_date);
        addText(
          96,
          268,
          ed.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
          }),
          { fontSize: 2.8, anchor: 'middle' },
        );
      }

      // At (place)
      addText(130, 268, mawb.billing.place, {
        fontSize: 2.8,
        anchor: 'middle',
      });
    }

    // Wrap all text elements in a group for clean layering
    return `<g id="data-overlay" style="font-family:Arial,sans-serif">\n${texts.join('\n')}\n</g>`;
  }
}
