import { Test, TestingModule } from '@nestjs/testing';
import { UserRoomService } from './user-room.service';

describe('UserRoomService', () => {
  let service: UserRoomService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserRoomService],
    }).compile();

    service = module.get<UserRoomService>(UserRoomService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
