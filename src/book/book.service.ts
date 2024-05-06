import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { IBook } from './schemas/book.schema'; 

@Injectable()
export class BookService {
  constructor(
    @InjectModel('Book')
    private readonly bookModel: mongoose.Model<IBook & Document>,
  ) {}

  async create(book: IBook): Promise<IBook> {
    const res = await this.bookModel.create(book);
    return res;
  }
  
  async findAll(): Promise<IBook[]> {
    const books = await this.bookModel.find();
    return books;
  }

  async findById(id: string): Promise<IBook> {
    const isValidId = mongoose.isValidObjectId(id);
    
    if (!isValidId) {
      throw new BadRequestException('Please enter correct id.');
    }
    
    const book = await this.bookModel.findById(id);
    
    if (!book) {
      throw new NotFoundException('Book not found.');
    }
    
    return book;
  }

  async updateById(id: string, book: IBook): Promise<IBook> {
    return await this.bookModel.findByIdAndUpdate(id, book, {
      new: true,
      runValidators: true,
    });
  }

  async deleteById(id: string): Promise<IBook> {
    return await this.bookModel.findByIdAndDelete(id);
  }
}
