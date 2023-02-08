package smilegate.seagull.room.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import smilegate.seagull.utils.Base62;
import smilegate.seagull.room.domain.Room;
import smilegate.seagull.room.repository.RoomRedisRepository;
import smilegate.seagull.user.domain.User;
import smilegate.seagull.utils.StringBase62;

import java.nio.charset.Charset;
import java.util.Base64;
import java.util.Iterator;
import java.util.Optional;

@Service
public class RoomService {

    @Value("${client.room-url}")
    private String url;

    @Autowired
    private RoomRedisRepository roomRedisRepository;

    public Room createRoom(String userId, String link) {
        /**
         *  TODO
         *   roomDTO 만들기
         * **/

        Room roomTemp = new Room();
        roomTemp.setHostId(userId);
        roomTemp.setRoomLink(link);
        Room room = roomRedisRepository.save(roomTemp);
        return room;
    }

    public String generateRoom(String userId) {
        String encodedString = Base64.getEncoder().encodeToString(userId.getBytes());
        return encodedString;
    }

    public void deleteRoom(String roomLink) {
        Optional<Room> room = roomRedisRepository.findByRoomLink(roomLink);
        if(room != null) roomRedisRepository.delete(room.get());
    }

    public Optional<Room> findRoom(String roomLink) {
        Iterable<Room> all = roomRedisRepository.findAll();
        Iterator<Room> iterator = all.iterator();
        for (Iterator<Room> iter = iterator; iter.hasNext(); ) {
            Room room = iter.next();
            if(room.getRoomLink().equals(roomLink)) return Optional.of(room);
        }
        return null;
//        Optional<Room> room = roomRedisRepository.findByRoomLink(roomLink);
//        return room;
    }
}
