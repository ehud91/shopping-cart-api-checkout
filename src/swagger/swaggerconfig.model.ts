import { DocumentBuilder } from '@nestjs/swagger';

const SwaggerConfig =  new DocumentBuilder()
    .setTitle('Shopping-cart Api')
    .setDescription('The Shopping-cart API description')
    .setVersion('1.0')
    .addTag('ShoppingCart')
    .build();


export { SwaggerConfig };    