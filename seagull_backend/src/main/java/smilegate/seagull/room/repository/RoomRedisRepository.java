package smilegate.seagull.room.repository;

import org.springframework.data.repository.CrudRepository;
import smilegate.seagull.room.domain.Room;

public interface RoomRedisRepository  extends CrudRepository<Room, String> {

}
