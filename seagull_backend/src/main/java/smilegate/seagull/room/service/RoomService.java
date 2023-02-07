package smilegate.seagull.room.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import smilegate.seagull.utils.Base62;
import smilegate.seagull.room.domain.Room;
import smilegate.seagull.room.repository.RoomRedisRepository;
import smilegate.seagull.user.domain.User;

@Service
public class RoomService {

    @Value("${client.room-url}")
    private String url;

    @Autowired
    private RoomRedisRepository roomRedisRepository;

    public Room createRoom(User user, String link) {
        Room room = new Room();
        room.setRoomName("eGuBa");
        room.setHostId(user.getId());
        room.setRoomLink(link);
        roomRedisRepository.save(room);
        return room;
    }

    public String generateRoom(User user) {
        int decode = Base62.decode(user.getId().toString());
        String roomLink = url + decode;
        return roomLink;
    }

    public void deleteRoom(String roomLink) {
        Room room = roomRedisRepository.findByRoomLink(roomLink);
        roomRedisRepository.delete(room);
    }

    public Room findRoom(String roomLink) {
        Room room = roomRedisRepository.findByRoomLink(roomLink);
        return room;
    }
}
