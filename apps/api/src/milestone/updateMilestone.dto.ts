import { IsDate, IsString, MinDate } from 'class-validator';
import { UpdateMilestone } from '../graphql';
import { IsBiggerThan } from '../validators/isBiggerThan';
import { Type } from 'class-transformer';

export class UpdateMilestoneMilestoneDto implements UpdateMilestone {
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
