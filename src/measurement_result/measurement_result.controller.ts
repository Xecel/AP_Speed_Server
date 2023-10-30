import {
  Controller,
  HttpException,
  HttpStatus,
  Query,
  Req,
} from '@nestjs/common';
import { MeasurementResult } from './entity/measurement_result.entity';
import { MeasurementResultService } from './measurement_result.service';

// import { UpdateMeasurementResultDTO } from './dto/update_measuerment_result.dto';

import { Get, Post, Param, Delete } from '@nestjs/common';

import { Request } from 'express';

// api -> measurement_result
@Controller('measurement-result')
export class MeasurementResultController {
  constructor(
    private readonly measurementResultService: MeasurementResultService,
  ) {}

  @Get()
  getAllMeasurementResults(): Promise<MeasurementResult[]> {
    return this.measurementResultService.findAll();
  }

  @Get('/create')
  createDummy() {
    this.measurementResultService.createDummys();
  }

  @Get('/delete')
  deleteDummy() {
    this.measurementResultService.deleteDummys();
  }

  @Get('/getByDay')
  findAll(@Query('day') day: number) {
    return this.measurementResultService.findByDay(day);
  }

  @Get(':id')
  getOneById(@Param('id') id: string): Promise<MeasurementResult> {
    return this.measurementResultService.findOneBy(id);
  }

  @Delete(':id')
  removeOneById(@Param('id') id: string): Promise<void> {
    return this.measurementResultService.remove(id);
  }

  // http://localhost:4000/api/speedtest => http://localhost:3000/measurement-result
  @Post()
  async createMeasurementResult(@Req() req: Request) {
    try {
      const createdMeasurementResult =
        await this.measurementResultService.createMeasurementResult(req);
      return createdMeasurementResult;
    } catch (error) {
      console.error('An error occurred:', error);
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
