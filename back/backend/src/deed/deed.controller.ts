import { Controller, Get } from '@nestjs/common';
import { DeedService } from './deed.service';

@Controller('/deed')
export class DeedController {
  constructor(public deedService: DeedService) {}
  @Get()
  getAll() {
    const users = this.deedService.getAll();
    return users;
  }
}
