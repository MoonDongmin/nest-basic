import { BadRequestException, Module } from '@nestjs/common';
import { CommonService } from './common.service';
import { CommonController } from './common.controller';
import { MulterModule } from '@nestjs/platform-express';
import { extname } from 'path';
import * as multer from 'multer';
import { POST_IMAGE_PATH, TEMP_FOLDER_PATH } from './const/path.const';
import { v4 as uuid } from 'uuid';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    MulterModule.register({
      // 파일 크기 제한
      limits: {
        // 바이트 단위
        fieldSize: 10000000,
      },
      fileFilter: (req, file, callback) => {
        /**
         * cb(에러, boolean)
         *
         * 첫 번째 파라미터에는 에러가 있을 경우 에러 정보를 넣어줌
         * 두 번째 파라미터는 파일을 다운 받을지 말지 boolean을 넣어줌
         */
        // xxx.jpg -> .jpg 확장자만 따옴
        const ext = extname(file.originalname);

        if (ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png') {
          return callback(
            new BadRequestException('jpg/jpeg/png 파일만 업로드 가능합니다.'),
            false,
          );
        }
        return callback(null, true);
      },
      storage: multer.diskStorage({
        // 어디로 다운로드할 것인지
        destination: function (req, res, callback) {
          callback(null, TEMP_FOLDER_PATH);
        },
        filename: function (req, file, callback) {
          callback(null, `${uuid()}${extname(file.originalname)}`);
        },
      }),
    }),
  ],
  controllers: [CommonController],
  providers: [CommonService],
  exports: [CommonService],
})
export class CommonModule {}
