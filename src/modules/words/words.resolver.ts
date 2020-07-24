import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Parent, Query, ResolveField, Resolver, Int } from '@nestjs/graphql'
import * as DataLoader from 'dataloader'
import { Loader } from 'nestjs-dataloader-dan'
import { from, Observable } from 'rxjs'
import { GqlAuthGuard } from '../../guards/gqlAuth.guard'
import { CategoriesLoader } from '../categories/categories.loader'
import { Category } from '../categories/models/categories.model'
import { Word } from './words.model'
import { WordsService } from './words.service'
import { WordCreateInput } from './dtos/word-create.input'
import { WorldUpdateInput } from './dtos/word-update.input'

@UseGuards(GqlAuthGuard)
@Resolver(of => Word)
export class WordsResolver {
  constructor(private readonly wordsService: WordsService) {}

  @Query(returns => [Word])
  words() {
    return this.wordsService.findAll()
  }

  @Query(returns => [Word])
  randomWords(
    @Args({ name: 'categoryId', type: () => String }) categoryId: string,
    @Args({ name: 'limit', type: () => Int }) limit: number
  ) {
    return this.wordsService.getRandomWords(categoryId, limit)
  }

  @Query(returns => Word)
  word(@Args({ name: '_id', type: () => String }) _id) {
    return this.wordsService.findById(_id)
  }

  @Mutation(returns => Word)
  createWord(@Args('data') word: WordCreateInput) {
    return this.wordsService.create(word)
  }

  @Mutation(returns => Word)
  updateWord(@Args({ name: '_id', type: () => String }) _id: string, @Args('data') wordData: WorldUpdateInput) {
    return this.wordsService.updateById(_id, wordData)
  }

  @Mutation(returns => Word)
  deleteWord(@Args({ name: '_id', type: () => String }) _id: string) {
    return this.wordsService.deleteById(_id)
  }

  @ResolveField('category', () => Category)
  resolveCategory(
    @Parent() word: Word,
    @Loader(CategoriesLoader.name) categoriesLoader: DataLoader<string, Category>
  ): Observable<Category | null> {
    return from(categoriesLoader.load(word.category.toString()))
  }
}
