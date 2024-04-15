import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { IBook } from './schemas/book.schema';

@Controller('book')
export class BookController {
  constructor(private bookService: BookService) {}

  @Post('/addBook')
  async createBook(
    @Body()
    book: CreateBookDto,
  ): Promise<IBook> {
    return this.bookService.create(book);
  }

  @Get('/getAllBooks')
  async getAllBooks(): Promise<IBook[]> {
    return this.bookService.findAll();
  }

  @Get('/getBook/:id')
  async getBook(
    @Param('id')
    id: string,
  ): Promise<IBook> {
    return this.bookService.findById(id);
  }

  @Put('/UpdateBook/:id')
  async updateBook(
    @Param('id')
    id: string,
    @Body()
    book: UpdateBookDto,
  ): Promise<IBook> {
    return this.bookService.updateById(id, book);
  }

  @Delete('/DeleteBook/:id')
  async deleteBook(
    @Param('id')
    id: string,
  ): Promise<IBook> {
    return this.bookService.deleteById(id);
  }
}
