package smilegate.seagull.room.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import smilegate.seagull.room.domain.Room;
import smilegate.seagull.user.domain.User;

import java.util.ArrayList;
import java.util.List;

@Repository
public class RoomRepository {
//
//    public static List<Room> roomList = new ArrayList<>();
//    public static Long roomId = 1L;
//
//    public Room save(User user, String link) {
//        Room room = new Room();
//        room.setHostId(user.getId());
//        room.setRoomLink(link);
//        room.setId(roomId++);
//        roomList.add(room);
//        return room;
//    }
//
//    public void delete(String roomLink) {
//        roomList.remove(roomLink);
//    }
//
//    public Room findByRoomLink(String roomLink) {
//        Room room = new Room();
//
//        for (Room i : roomList) {
//            if(i.getRoomLink().equals(roomLink)) return i;
//        }
//
//        return room;
//    }
}
