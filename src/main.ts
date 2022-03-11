/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { NestFactory } from '@nestjs/core'
import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
    HttpStatus,
    ValidationPipe
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { Response } from 'express'
import AppModule from './app.module'

@Catch()
class AllExceptionsFilter implements ExceptionFilter {

    catch(exception: unknown, host: ArgumentsHost) {

        const ctx = host.switchToHttp()
        const response = ctx.getResponse<Response>()

        let statusCode = HttpStatus.INTERNAL_SERVER_ERROR
        let message = 'Internal Service Error'

        if (exception instanceof HttpException) {
            statusCode = exception.getStatus()
            message = exception.message
        }

        response.status(statusCode).json({
            status: 'failure',
            status_code: statusCode,
            message
        })
    }

}

const bootstrap = async () => {

    const app = await NestFactory.create(AppModule)

    app.useGlobalFilters(new AllExceptionsFilter())
    app.useGlobalPipes(new ValidationPipe())

    const configService = app.get<ConfigService>(ConfigService)

    const swaggerDocumentConfig = new DocumentBuilder()
        .setTitle('Minimouli')
        .setDescription('The API that runs the minimouli platform.')
        .setVersion('2.0')
        .addBearerAuth()
        .build()

    const swaggerDocument = SwaggerModule.createDocument(app, swaggerDocumentConfig)

    if (configService.get<string>('SWAGGER_VISIBILITY') === 'show')
        SwaggerModule.setup('swagger', app, swaggerDocument)

    await app.listen(configService.get<number>('APP_PORT'))
}

bootstrap()
