package smilegate.seagull.room.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import smilegate.seagull.redis.RedisDao;
import smilegate.seagull.room.domain.Room;
import smilegate.seagull.room.repository.RoomRedisRepository;

import javax.annotation.PostConstruct;
import java.util.*;

@Service
public class RoomService {

    @Value("${client.room-url}")
    private String url;

    @Autowired
    private RoomRedisRepository roomRedisRepository;

    private final RedisDao redisDao;

    @Autowired
    public RoomService(RedisDao redisDao) {
        this.redisDao = redisDao;
    }

    private Map<String, Room> roomMap = new HashMap<>();

    @PostConstruct
    public void init() {
        String roomLink1 = generateRoomLink("jun");
        String roomLink2 = generateRoomLink("pok");
        String roomLink3 = generateRoomLink("woc");
        System.out.println(roomLink1);
        System.out.println(roomLink2);
        System.out.println(roomLink3);
        Room room1 = new Room("jun",roomLink1);
        Room room2 = new Room("pok",roomLink2);
        Room room3 = new Room("woc",roomLink3);
        redisDao.setValues("jun",roomLink1);
        redisDao.setValues("pok",roomLink2);
        redisDao.setValues("woc",roomLink3);
    }

    public Room createRoom(String userId, String roomLink) {
//        Room room = Room.create(userId, roomLink);
        Room room = new Room();
        room.setRoomLink(roomLink);
        room.setHostId(userId);
        Room saveRoom = roomRedisRepository.save(room);
//        roomMap.put(userId, room);
        return saveRoom;
    }

    public String generateRoomLink(String userId) {
        String encodedString = Base64.getEncoder().encodeToString(userId.getBytes());
        return encodedString;
    }

//    public void deleteRoom(Long roomId) {
//        Optional<Room> room = roomRedisRepository.findById(roomId);
//        if(room.isPresent()) roomRedisRepository.delete(room.get());
//    }

    public Optional<Room> findRoom(String roomLink) {
        Iterable<Room> all = roomRedisRepository.findAll();
        Iterator<Room> iterator = all.iterator();
        for (Iterator<Room> iter = iterator; iter.hasNext(); ) {
            Room room = iter.next();
            if(room.getRoomLink().equals(roomLink)) return Optional.of(room);
        }
        return null;
    }

    public Optional<Room> findRoomLink(String roomLink) {
        Iterable<Room> all = roomRedisRepository.findAll();
        for (Room room : all) {
            if(room.getRoomLink().equals(roomLink)) return Optional.of(room);
        }
        return null;
    }
}
