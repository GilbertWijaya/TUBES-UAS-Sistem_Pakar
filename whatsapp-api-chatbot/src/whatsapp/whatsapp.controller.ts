import { Controller, Get } from '@nestjs/common';
import { WhatsappService } from './whatsapp.service';

@Controller('whatsapp')
export class WhatsappController {
  constructor(private readonly waService: WhatsappService) {}

  @Get('status')
  getStatus() {
    return { message: 'WhatsApp Bot aktif 🚀' };
  }
}
