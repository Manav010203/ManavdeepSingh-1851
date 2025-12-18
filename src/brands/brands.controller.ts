import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Param,
  Body,
  UseGuards,
  Req,
  ParseIntPipe,
} from '@nestjs/common';
import { BrandsService } from './brands.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { UpdateBrandStatusDto } from './dto/update-brand-status.dto';

import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { UserRole } from '../users/user-role.enum';

@Controller('brands')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN) // applies to ALL routes
export class BrandsController {
  constructor(private readonly brandsService: BrandsService) {}

  // ✅ Create Brand
  @Post()
  create(@Body() dto: CreateBrandDto, @Req() req) {
    return this.brandsService.create(dto, req.user);
  }

  // ✅ List All Brands
  @Get()
  findAll() {
    return this.brandsService.findAll();
  }

  // ✅ Update Brand
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateBrandDto,
  ) {
    return this.brandsService.update(id, dto);
  }

  // ✅ Delete Brand
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.brandsService.remove(id);
  }

  // ✅ Update Brand Status (ADMIN ONLY)
  @Patch(':id/status')
  updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateBrandStatusDto,
  ) {
    return this.brandsService.updateStatus(id, dto.status);
  }
}
