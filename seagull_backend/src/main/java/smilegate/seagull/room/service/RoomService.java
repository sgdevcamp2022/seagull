package smilegate.seagull.room.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import smilegate.seagull.room.domain.Room;
import smilegate.seagull.room.repository.RoomRepository;
import smilegate.seagull.user.domain.User;

@Service
public class RoomService {

    private RoomRepository roomRepositry;

    public Room createRoom(User user, String roomName, String link) {
        Room room = roomRepositry.save(user, roomName, link);
        return room;
    }

    public String generateRoom() {
        /**
         *  TODO
         *      1. 뷰로 접속할 예정이라서 s3버킷에 올라갈 리액트 서버로 접속함. 서버에서는 그 주소에 방 아이디만 파라메타로 붙여서 줌.
         *      2. 지금 생각해보니까 url쇼트너로 변환해서 보내면 원본 주소 찾아주는 서버를 또 만들어서 클라이언트에서 다시 그 서버로 변환해야함.
         *      3. 변환된 링크를 요청하면
         * **/
        String roomLink = "http://";
        return roomLink;
    }

    public void deleteRoom(String roomLink) {
        roomRepositry.delete(roomLink);
    }
}
