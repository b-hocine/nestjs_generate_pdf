import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CreatePdfDto } from './dto/create-pdf.dto';
import { UpdatePdfDto } from './dto/update-pdf.dto';
import * as ejs from 'ejs';
import * as pdf from 'html-pdf';
import * as fs from 'fs';
import { join } from 'path';

export interface PdfData {
  title: string;
  content: string;
}

@Injectable()
export class PdfService {
  create(createPdfDto: CreatePdfDto) {
    return 'This action adds a new pdf';
  }

  findAll() {
    return `This action returns all pdf`;
  }

  findOne(id: number) {
    return `This action returns a #${id} pdf`;
  }

  update(id: number, updatePdfDto: UpdatePdfDto) {
    return `This action updates a #${id} pdf`;
  }

  remove(id: number) {
    return `This action removes a #${id} pdf`;
  }

  async generatePdf(data: PdfData): Promise<Buffer> {
    return new Promise<Buffer>((resolve, reject) => {
      const templatePath = join(process.cwd(), 'src','assets', 'pdf-template.ejs');
      const template: string = fs.readFileSync(templatePath, 'utf8');

      const html: string = ejs.render(template, data);

      const options: pdf.CreateOptions = {
        format: 'A4',
        orientation: 'portrait',
      };

      pdf.create(html, options).toBuffer((err: Error | null, buffer: Buffer | null) => {
        if (err) {
          reject(err);
        } else {
          resolve(buffer!);
        }
      });
    });
  }  
}
