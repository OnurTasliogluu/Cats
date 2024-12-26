import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'; // Import ConfigModule for environment management
import { CatsModule } from './cats/cats.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    // Load environment variables and make them globally available
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV || 'development'}`, // Use environment-specific .env files
    }),
    CatsModule, // Import the Cats module
  ],
  controllers: [AppController], // Main application controller
  providers: [AppService], // Application-wide services
})
export class AppModule {}
