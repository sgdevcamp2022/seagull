package smilegate.seagull.room.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import smilegate.seagull.room.domain.Room;
import smilegate.seagull.room.repository.RoomRedisRepository;
import smilegate.seagull.room.repository.RoomRepository;
import smilegate.seagull.user.domain.User;

@Service
public class RoomService {

    private RoomRepository roomRepositry;

    @Autowired
    private RoomRedisRepository roomRedisRepository;

    public Room createRoom(User user, String roomName, String link) {
        //        Room room = roomRepositry.save(user, roomName, link);
        Room room = new Room();
        room.setRoomHost(user);
        room.setRoomName(roomName);
        room.setRoomLink(link);
        roomRedisRepository.save(room);
        return room;
    }

    public String generateRoom(User user) {
        /**
         *  TODO
         *      1. 뷰로 접속할 예정이라서 s3버킷에 올라갈 리액트 서버로 접속함. 서버에서는 그 주소에 방 아이디만 파라메타로 붙여서 줌.
         *      2. 지금 생각해보니까 url쇼트너로 변환해서 보내면 원본 주소 찾아주는 서버를 또 만들어서 클라이언트에서 다시 그 서버로 변환해야함.
         *      3. 변환된 링크를 요청하면 서버에서 뷰 주소로 리다이렉트 시켜주는 방식으로 해보자.
         *      4. 기본적으로 db에 originalURL을 저장하고 그 인덱스값을 가지고 Base62인코딩함. 그 후에 디코딩요청 들어오면 인덱스값 꺼내서 돌려줌.
         * **/
        String roomLink = "http://"+/*뷰서버 주소*/"?id="+user.getId();
        return roomLink;
    }

    public void deleteRoom(String roomLink) {
        roomRepositry.delete(roomLink);
    }
}
