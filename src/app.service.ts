import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return `<div style="padding: 15px;font-family: Arial;background-color: #eee;display: inline-block;">
              <h1>Title app backend</h1>
              <h3>API Documentation: <a href="/api-documentation">/api-documentation</a></h3>
              <h3>NODE_ENV: <mark style="padding: 0 5px">${process.env.NODE_ENV}</mark></h3>
            </div>`;
  }
}
