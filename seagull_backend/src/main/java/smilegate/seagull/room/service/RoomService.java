package smilegate.seagull.room.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import smilegate.seagull.room.domain.RoomUser;
import smilegate.seagull.room.repository.RoomRedisRepository;
import smilegate.seagull.room.repository.RoomUserRedisRepository;

import java.util.*;

@Slf4j
@Service
public class RoomService {

    private final RoomRedisRepository roomRedisRepository;

    @Autowired
    public RoomService(RoomRedisRepository roomRedisRepository) {
        this.roomRedisRepository = roomRedisRepository;
    }

    public static String generateRoomLink(String userId) {
        String encodedString = Base64.getEncoder().encodeToString(userId.getBytes());
        return encodedString;
    }

    public RoomUser createRoom(String userId) {
        String roomLink = RoomService.generateRoomLink(userId);
        RoomUser roomUser = new RoomUser(roomLink,userId);
        roomRedisRepository.setRoom(roomUser.getRoomLink(),roomUser.getUserId());
        return roomUser;
    }

    public Boolean isExistRoom(String roomLink) {
        Long setSize = roomRedisRepository.getRoomCount(roomLink);
        if(setSize == 0L) return false;
        return true;
    }

    public void deleteRoom(String roomLink) {
        roomRedisRepository.deleteRoom(roomLink);
    }

    public Boolean findByHost(String roomLink, String userId) {
        return roomRedisRepository.hostCheck(roomLink, userId);
    }

    public String findHost(String roomLink) {
        return roomRedisRepository.getRoomHost(roomLink);
    }
}
