import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { PdfData, PdfService } from './pdf.service';
import { CreatePdfDto } from './dto/create-pdf.dto';
import { UpdatePdfDto } from './dto/update-pdf.dto';
import { Response } from 'express';

@Controller('pdf')
export class PdfController {
  constructor(private readonly pdfService: PdfService) {}

  // @Post()
  // create(@Body() createPdfDto: CreatePdfDto) {
  //   return this.pdfService.create(createPdfDto);
  // }

  // @Get()
  // findAll() {
  //   return this.pdfService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.pdfService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updatePdfDto: UpdatePdfDto) {
  //   return this.pdfService.update(+id, updatePdfDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.pdfService.remove(+id);
  // }

  @Get('generate')
  async generatePdf(@Res() res: Response): Promise<void> {
    const data: PdfData = {
      title: 'Sample PDF',
      content: '<h1>This is a sample PDF generated using EJS and NestJS with TypeScript.</h1>',
    };

    const pdfBuffer: Buffer = await this.pdfService.generatePdf(data);

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=sample.pdf');
    res.setHeader('Content-Length', pdfBuffer.length);
    res.end(pdfBuffer);
  }
}
