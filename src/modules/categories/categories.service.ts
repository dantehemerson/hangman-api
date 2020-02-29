import { Injectable } from '@nestjs/common'
import { InjectModel } from 'nestjs-typegoose'
import { ReturnModelType } from '@typegoose/typegoose'
import { from, of, Observable } from 'rxjs'
import { concatMap } from 'rxjs/operators'
import { Category } from './categories.model'
import { CreateCategoryDto } from './dto/createCategory.dto'
import { UpdateCategoryDto } from './dto/updateCategory.dto'

@Injectable()
export class CategoriesService {
  constructor(@InjectModel(Category) private readonly categoryModel: ReturnModelType<typeof Category>) {}

  findAll() {
    return from(
      this.categoryModel
        .find({})
        .sort({ createdAt: -1 })
        .lean()
    )
  }

  findById(categoryId: string): Observable<Category | null> {
    return from(this.categoryModel.findById(categoryId).lean())
  }

  findByIds(categoryIds: readonly string[]): Observable<Category[]> {
    return from(this.categoryModel.find({ _id: { $in: categoryIds } }).lean())
  }

  create(category: CreateCategoryDto): Observable<Category> {
    return from(this.categoryModel.create(category))
  }

  updateById(categoryId: string, categoryDate: UpdateCategoryDto): Observable<Category | null> {
    return from(
      this.categoryModel
        .findByIdAndUpdate(
          categoryId,
          {
            $set: categoryDate
          },
          {
            new: true
          }
        )
        .lean()
    )
  }

  deleteById(categoryId: string): Observable<Category | null> {
    return from(this.categoryModel.findByIdAndDelete(categoryId).lean())
  }
}
