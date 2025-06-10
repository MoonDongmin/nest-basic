import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';

// Catch() 안에 있는 예외만 처리할 수 있음
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status = exception.getStatus();

    // 로그 파일을 생성하거나
    // 에러 모니터링 시스템에 API 콜 하기

    response.status(status).json({
      statusCode: status,
      message: exception.message,
      timestamp: new Date().toLocaleString('kr'),
      path: request.url,
    });
  }
}
