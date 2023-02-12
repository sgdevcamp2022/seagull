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
    public void init() { // 테스트용 더미 데이터
        String roomLink1 = generateRoomLink("jun");
        String roomLink2 = generateRoomLink("pok");
        String roomLink3 = generateRoomLink("woc");
        redisDao.setValues(roomLink1,"jun");
        redisDao.setValues(roomLink2,"pok");
        redisDao.setValues(roomLink3,"woc");
    }

    public Room createRoom(String userId) {
        String roomLink = generateRoomLink(userId);
        Room room = Room.create(userId, roomLink);
//        Room room = new Room();
//        room.setRoomLink(roomLink);
//        room.setHostId(userId);
//        roomMap.put(roomLink, room);
        Room saveRoom = roomRedisRepository.save(room);
        redisDao.setValues(userId, roomLink);
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
//        Iterable<Room> all = roomRedisRepository.findAll();
//        for (Room room : all) {
//            if(room.getRoomLink().equals(roomLink)) return Optional.of(room);
//        }
//        return null;
        Optional<Room> byRoomLink = roomRedisRepository.findByRoomLink(roomLink);
        if(byRoomLink.isPresent()) return byRoomLink;
        return Optional.empty();
    }

}
