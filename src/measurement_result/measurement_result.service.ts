import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { MeasurementResult } from './entity/measurement_result.entity';
import { CreateMeasurementResultDTO } from './dto/create_measuerment_result.dto';
import { UpdateMeasurementResultDTO } from './dto/update_measuerment_result.dto';

import { Request } from 'express';

import { UserData } from './entity/user-data.entity';
import { SpeedData } from './entity/speed-data.entity';

@Injectable()
export class MeasurementResultService {
  constructor(
    @InjectRepository(MeasurementResult)
    private readonly measurementResultRepository: Repository<MeasurementResult>,
  ) {}

  findAll(): Promise<MeasurementResult[]> {
    return this.measurementResultRepository.find();
  }

  findOneBy(inpId: string): Promise<MeasurementResult> {
    return this.measurementResultRepository.findOneBy({ id: inpId });
  }

  async create(measurementResult: CreateMeasurementResultDTO) {
    await this.measurementResultRepository.save(measurementResult);
  }

  async update(inpId: string, measurementResult: UpdateMeasurementResultDTO) {
    const prevMeasurementResult =
      await this.measurementResultRepository.findOneBy({ id: inpId });

    if (!prevMeasurementResult) {
      throw new NotFoundException(
        `MeasurementResult with ID ${inpId} not found`,
      );
    }

    const updatedMeasurementResult = {
      ...prevMeasurementResult,
      ...measurementResult,
    };
    await this.measurementResultRepository.save(updatedMeasurementResult);

    return updatedMeasurementResult;
  }

  async remove(inpId: string): Promise<void> {
    const measurementResultToRemove =
      await this.measurementResultRepository.findOneBy({ id: inpId });

    if (!measurementResultToRemove) {
      throw new NotFoundException(
        `MeasurementResult with ID ${inpId} not found`,
      );
    }

    await this.measurementResultRepository.remove(measurementResultToRemove);
  }

  // 이 아래부터 기존 서버 코드 포팅
  // 기존 Post json데이터를 사용하여 db-data-create
  async createMeasurementResult(req: Request) {
    const {
      dlStatus,
      ulStatus,
      pingStatus,
      jitterStatus,
      clientIp,
      floorNumber,
      roomNumber,
      locationClass,
      userCookie,
    } = req.body;

    const createdMeasurementResultDTO = new CreateMeasurementResultDTO();

    createdMeasurementResultDTO.user = new UserData();

    // User
    createdMeasurementResultDTO.user.floorNumber = floorNumber;
    createdMeasurementResultDTO.user.roomNumber = roomNumber;
    createdMeasurementResultDTO.user.locationClass = locationClass;
    createdMeasurementResultDTO.user.userCookie = userCookie;

    // Speed
    createdMeasurementResultDTO.speedTest = new SpeedData();

    createdMeasurementResultDTO.speedTest.dlStatus = dlStatus;
    createdMeasurementResultDTO.speedTest.ulStatus = ulStatus;
    createdMeasurementResultDTO.speedTest.pingStatus = pingStatus;
    createdMeasurementResultDTO.speedTest.jitterStatus = jitterStatus;
    createdMeasurementResultDTO.speedTest.clientIp = clientIp;

    try {
      await this.measurementResultRepository.save(createdMeasurementResultDTO);
    } catch (error) {
      console.error(error);
    }

    return createdMeasurementResultDTO;
  }

  // day = 0 -> Sunday ~
  async findByDay(dayOfWeek: number) {
    if (dayOfWeek < 0 || dayOfWeek > 6) {
      throw new Error('Invalid day of week');
    }

    const returnJson = [];
    const data = await this.measurementResultRepository.find();

    // dayOfWeek 요일에 맞춰서 필터링한 데이터를 반환
    data.forEach((item) => {
      const date = new Date(item.updated_at);
      const day = date.getDay();
      if (day == dayOfWeek) {
        returnJson.push(item);
      }
    });
    return returnJson;
  }

  // Create Dummy
  getPreviousDateByDay(day: number) {
    const date = new Date();
    const diff = date.getDay() - day;
    if (diff > 0) {
      date.setDate(date.getDate() - diff);
    } else if (diff < 0) {
      date.setDate(date.getDate() - 8 + diff);
    }
    return date;
  }

  async createDummy(day: number, dlMinRange: number, dlMaxRange: number) {
    const floorNumberRange = [4, 6]; // 층수 범위
    const roomPerFloor = 30; // 각 층에 있는 방의 개수

    const locationClassRange = [1, 9]; // 위치 클래스 범위
    const dlStatusRange = [dlMinRange, dlMaxRange]; // 다운로드 속도 범위
    const pingStatusRange = [1, 100]; // 핑 상태 범위

    const floorNumber =
      Math.floor(
        Math.random() * (floorNumberRange[1] - floorNumberRange[0] + 1),
      ) + floorNumberRange[0];
    const roomNumber =
      floorNumber * 100 + Math.floor(Math.random() * roomPerFloor) + 1; // 층수에 따른 방 번호 계산
    const locationClass =
      Math.floor(
        Math.random() * (locationClassRange[1] - locationClassRange[0] + 1),
      ) + locationClassRange[0];
    const userCookie = '9c011d7d-d02a-48fb-8958-2f02dc35a0c6';
    const dlStatus =
      Math.random() * (dlStatusRange[1] - dlStatusRange[0]) + dlStatusRange[0];
    const ulStatus = 333.73;
    const pingStatus =
      Math.random() * (pingStatusRange[1] - pingStatusRange[0]) +
      pingStatusRange[0];
    const clientIp = '115.94.80.117';
    const jitterStatus = 6.89;

    const updatedAt = this.getPreviousDateByDay(day);

    const createdMeasurementResultDTO = new CreateMeasurementResultDTO();

    createdMeasurementResultDTO.user = new UserData();

    // User
    createdMeasurementResultDTO.user.floorNumber = floorNumber;
    createdMeasurementResultDTO.user.roomNumber = roomNumber;
    createdMeasurementResultDTO.user.locationClass = locationClass;
    createdMeasurementResultDTO.user.userCookie = userCookie;

    // Speed
    createdMeasurementResultDTO.speedTest = new SpeedData();

    createdMeasurementResultDTO.speedTest.dlStatus = dlStatus;
    createdMeasurementResultDTO.speedTest.ulStatus = ulStatus;
    createdMeasurementResultDTO.speedTest.pingStatus = pingStatus;
    createdMeasurementResultDTO.speedTest.jitterStatus = jitterStatus;
    createdMeasurementResultDTO.speedTest.clientIp = clientIp;

    createdMeasurementResultDTO.updated_at = updatedAt;

    try {
      await this.measurementResultRepository.save(createdMeasurementResultDTO);
    } catch (error) {
      console.error(error);
    }
  }

  // create Dummy
  async createDummys() {
    for (let i = 0; i < 30; i++) {
      for (let j = 0; j < 2; j++) await this.createDummy(j, 40, 300);
      for (let j = 3; j <= 6; j++) await this.createDummy(j, 40, 300);
      await this.createDummy(2, 10, 50);
    }
  }

  // delete Dummy
  async deleteDummys() {
    this.measurementResultRepository
      .createQueryBuilder()
      .delete()
      .from(MeasurementResult)
      .execute();
  }
}
