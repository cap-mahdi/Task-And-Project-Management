import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Controller('user')
export class UserController {
  constructor(private readonly cloudinaryService: CloudinaryService) { }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  uploadImage(@UploadedFile() file: Express.Multer.File) {
    return this.cloudinaryService.uploadFile(file);
  }
}
