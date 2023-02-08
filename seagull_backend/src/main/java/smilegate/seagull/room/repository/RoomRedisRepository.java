package smilegate.seagull.room.repository;

import org.springframework.data.annotation.QueryAnnotation;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import smilegate.seagull.room.domain.Room;

import java.util.Collections;
import java.util.Optional;

public interface RoomRedisRepository extends CrudRepository<Room, Long> {
    // select * from Room u where u.RoomLink := roomLink
    Optional<Room> findByRoomLink(String roomLink);
}
