import { HttpException, HttpStatus } from "@nestjs/common";

export class ApplicationException extends HttpException {
   constructor(
      httpStatusCode: HttpStatus,
      error_code: string,
      error_message: string,
      description: string
   ) {
      super(
         {
            httpStatusCode,
            transaction_id: '',
            status: 'error',
            error_code,
            message: error_message,
            description,
         },
         httpStatusCode,
      )
   }

}