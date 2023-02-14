package smilegate.seagull.room.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import smilegate.seagull.room.domain.Room;
import smilegate.seagull.room.domain.RoomUser;

import java.util.*;

@Slf4j
@Service
public class RoomService {

//
////    private final RoomUserRedisRepository roomUserRedisRepository;
//    private final EnterUserService enterUserService;
//
//    @Autowired
//    public RoomService(EnterUserService enterUserService) {
//        this.enterUserService = enterUserService;
//    }
//
//
//    public RoomUser createRoom(String userId) {
////        Room room = Room.create(userId, roomLink);
////        Room saveRoom = roomRedisRepository.save(room);
//        String roomLink = generateRoomLink(userId);
//        RoomUser roomUser = new RoomUser(roomLink,userId);
////        enterUserService.enter(roomUser);
//        return roomUser;
//    }
//
    public static String generateRoomLink(String userId) {
        String encodedString = Base64.getEncoder().encodeToString(userId.getBytes());
        return encodedString;
    }
//
//    public Optional<Room> deleteRoom(Long roomId) {
//
//    }
//
//    public String findRoomLink(String roomLink) {
//        String user = enterUserService.getUser(roomLink);
//        log.info("findByLink userId : {}",user);
//        return user;
////        Optional<Room> byRoomLink = roomRedisRepository.findByRoomLink(roomLink);
////        log.info("room : {}",byRoomLink.get());
////        if(byRoomLink.isPresent()) return byRoomLink;
////        return Optional.empty();
//    }

}
