import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Brand } from './brand.entity';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { User } from '../users/user.entity';
import { BrandStatus } from './brand-status.enum';

// @Injectable()
// export class BrandsService {
//   constructor(
//     @InjectRepository(Brand)
//     private brandRepo: Repository<Brand>,
//   ) {}

//   create(dto: CreateBrandDto, admin: User) {
//     const brand = this.brandRepo.create({
//       ...dto,
//       createdBy: admin,
//     });
//     return this.brandRepo.save(brand);
//   }

//   findAll() {
//     return this.brandRepo.find({
//       relations: ['createdBy'],
//     });
//   }

//   async update(id: number, dto: UpdateBrandDto) {
//     const brand = await this.brandRepo.findOne({ where: { id } });
//     if (!brand) throw new NotFoundException('Brand not found');

//     Object.assign(brand, dto);
//     return this.brandRepo.save(brand);
//   }

//   async remove(id: number) {
//     const brand = await this.brandRepo.findOne({ where: { id } });
//     if (!brand) throw new NotFoundException('Brand not found');

//     return this.brandRepo.remove(brand);
//   }
//   async updateStatus(
//   brandId: number,
//   status: BrandStatus,
// ) {
//   const brand = await this.brandRepository.findOne({
//     where: { id: brandId },
//   });

//   if (!brand) {
//     throw new NotFoundException('Brand not found');
//   }

//   brand.status = status;
//   return this.brandRepository.save(brand);
// }

// }
@Injectable()
export class BrandsService {
  constructor(
    @InjectRepository(Brand)
    private readonly brandRepo: Repository<Brand>,
  ) {}

  create(dto: CreateBrandDto, admin: User) {
    const brand = this.brandRepo.create({
      ...dto,
      createdBy: admin,
      status: BrandStatus.DISAPPROVED,
    });
    return this.brandRepo.save(brand);
  }

  findAll() {
    return this.brandRepo.find({ relations: ['createdBy'] });
  }

  async update(id: number, dto: UpdateBrandDto) {
    const brand = await this.brandRepo.findOne({ where: { id } });
    if (!brand) throw new NotFoundException('Brand not found');

    Object.assign(brand, dto);
    return this.brandRepo.save(brand);
  }

  async remove(id: number) {
    const brand = await this.brandRepo.findOne({ where: { id } });
    if (!brand) throw new NotFoundException('Brand not found');

    return this.brandRepo.remove(brand);
  }

  async updateStatus(brandId: number, status: BrandStatus) {
    const brand = await this.brandRepo.findOne({
      where: { id: brandId },
    });

    if (!brand) {
      throw new NotFoundException('Brand not found');
    }

    brand.status = status;
    return this.brandRepo.save(brand);
  }
}
