import { DocumentBuilder } from "@nestjs/swagger";

export const swaggerConfig = new DocumentBuilder()
                            .setTitle('컬리널리 API Document')
                            .setVersion('1.0')
                            .build();