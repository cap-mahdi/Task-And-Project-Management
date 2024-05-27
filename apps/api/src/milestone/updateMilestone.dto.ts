import { IsDate, IsEnum, IsString, MinDate } from 'class-validator';
import { Status, UpdateMilestone } from '../graphql';
import { IsBiggerThan } from '../validators/isBiggerThan';
import { Type } from 'class-transformer';

export class UpdateMilestoneMilestoneDto implements UpdateMilestone {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  @IsEnum(Status)
  status?: Status;

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
