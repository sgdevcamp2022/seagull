package smilegate.seagull.room.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import smilegate.seagull.room.domain.Room;

import java.util.Optional;

//@Repository
public interface RoomRedisRepository extends CrudRepository<Room, Long> {

    Optional<Room> findByRoomLink(String roomLink);
}
