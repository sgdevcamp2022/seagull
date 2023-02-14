package smilegate.seagull.room.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import smilegate.seagull.room.domain.Room;
import smilegate.seagull.room.domain.RoomUser;
import smilegate.seagull.room.repository.RoomRedisRepository;

import java.util.*;

@Service
public class RoomService {


    private final RoomRedisRepository roomRedisRepository;
    private final EnterUserService enterUserService;

    @Autowired
    public RoomService(RoomRedisRepository roomRedisRepository, EnterUserService enterUserService) {
        this.roomRedisRepository = roomRedisRepository;
        this.enterUserService = enterUserService;
    }

    public Room createRoom(String userId) {
        String roomLink = generateRoomLink(userId);
        Room room = Room.create(userId, roomLink);
        Room saveRoom = roomRedisRepository.save(room);
        RoomUser roomUser = new RoomUser(roomLink,userId);
        enterUserService.enter(roomUser);
        return saveRoom;
    }

    public String generateRoomLink(String userId) {
        String encodedString = Base64.getEncoder().encodeToString(userId.getBytes());
        return encodedString;
    }

    public Optional<Room> deleteRoom(Long roomId) {
        Optional<Room> room = roomRedisRepository.findById(roomId);
        if(room.isPresent()) roomRedisRepository.delete(room.get());
        return Optional.empty();
    }

    public Optional<Room> findRoomLink(String roomLink) {
        Optional<Room> byRoomLink = roomRedisRepository.findByRoomLink(roomLink);
        if(byRoomLink.isPresent()) return byRoomLink;
        return Optional.empty();
    }

}
