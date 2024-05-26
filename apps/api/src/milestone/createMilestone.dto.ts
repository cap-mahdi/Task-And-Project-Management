import { IsDate, IsString, MinDate, Validate } from 'class-validator';
import { CreateMilestone } from '../graphql';
import { IsBiggerThan } from '../validators/isBiggerThan';
import { Type } from 'class-transformer';

export class createMilestoneDto implements CreateMilestone {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsDate()
  @Type(() => Date)
  @MinDate(new Date(), {
    message: 'Start date should not be in the past',
  })
  startDate: Date;

  @IsDate()
  @Type(() => Date)
  @IsBiggerThan('startDate', {
    message: 'End date should be bigger than start date',
  })
  endDate: Date;
}
