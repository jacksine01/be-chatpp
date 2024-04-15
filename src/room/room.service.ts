import { Injectable } from '@nestjs/common';
import { Room } from './interfaces/room.interface';
import { CreateRoomDto } from './dto/create-room.dto';

@Injectable()
export class RoomService {
  private readonly rooms: Room[] = [];

  create(createRoomDto: CreateRoomDto): Room {
    const room: Room = {
      id: Math.random().toString(36).substring(7),
      name: createRoomDto.name,
    };
    this.rooms.push(room);
    return room;
  }

  findAll(): Room[] {
    return this.rooms;
  }
}
