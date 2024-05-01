import { Test, TestingModule } from '@nestjs/testing';
import { UserProjectResolver } from './user-project.resolver';

describe('UserProjectResolver', () => {
  let resolver: UserProjectResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserProjectResolver],
    }).compile();

    resolver = module.get<UserProjectResolver>(UserProjectResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
