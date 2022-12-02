import fs from 'fs';
import path from 'path';
import { SwaggerOptions } from 'swagger-ui-express';

const customCss = fs.readFileSync(path.join(__dirname) + '/swagger.css', 'utf8');

export const swaggerOptions: SwaggerOptions = {
  explorer: true,
  customCss,
  swaggerOptions: {
    url: 'http://localhost:5001/api/api-docs/swagger.json',
  },
};
