import { DocumentBuilder, SwaggerCustomOptions } from "@nestjs/swagger";

export const swaggerCustomOptions: SwaggerCustomOptions = {
    swaggerOptions: {
        persistAuthorization: true,
    },
}
export const swaggerConfig = new DocumentBuilder()
                            .setTitle('컬리널리 API Document')
                            .addBearerAuth( {
                                type: 'http',
                                scheme: 'bearer',
                                name: 'JWT',
                                in: 'header',
                              },
                              'Authorization',)
                            .setVersion('1.0')
                            .build();