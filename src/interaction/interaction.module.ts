import { Module } from '@nestjs/common';
import { InteractionService } from './interaction.service';
import { InteractionResolver } from './interaction.resolver';
import { TypegooseModule } from 'nestjs-typegoose';
import { InterAction } from './interaction.type';
import { ArticleModule } from 'src/article/article.module';

@Module({
  imports: [TypegooseModule.forFeature([InterAction]), ArticleModule],
  providers: [InteractionService, InteractionResolver],
})
export class InteractionModule {}
