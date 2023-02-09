package smilegate.seagull.room.repository;

import org.springframework.beans.factory.annotation.Autowired;
import smilegate.seagull.room.domain.Room;
import smilegate.seagull.room.service.RoomService;

import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

public class ChattingRoomRepository {
    Map<String, Room> chatRoomMap = new HashMap<>();

    @Autowired
    private RoomService roomService;

    public ChattingRoomRepository() {

        String userId = "aaa"; // userId 입력받아야함
        String roomLink1 = roomService.generateRoomLink(userId);
        Room room = roomService.createRoom(userId, roomLink1);
        chatRoomMap.put(roomLink1, room);

        String roomLink2 = roomService.generateRoomLink("bbb");
        Room room1 = roomService.createRoom(userId, roomLink2);
        chatRoomMap.put(roomLink2, room1);

        String roomLink3 = roomService.generateRoomLink("ccc");
        Room room2 = roomService.createRoom(userId, roomLink3);
        chatRoomMap.put(roomLink3, room2);

//        for(int i=0;i<3;i++) {
//            String userId = "tjdwns4537"; // userId 입력받아야함
//            String roomLink = roomService.generateRoomLink(userId);
//            Room room = roomService.createRoom(userId, roomLink);
//
//            chatRoomMap.put(i, room);
//            System.out.println("chatRoom 클래스를 복제하고 있습니다.");
//            System.out.println("chatRoom -> "+room);
//        }
    }

    public Room getChatRoom(String id) {
        return chatRoomMap.get(id);
    }

    public Collection<Room> getChatRooms() {
        return chatRoomMap.values();
    }
}
