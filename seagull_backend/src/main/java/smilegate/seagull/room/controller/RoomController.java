package smilegate.seagull.room.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.*;
import org.springframework.stereotype.Repository;
import org.springframework.util.MimeType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;
import smilegate.seagull.room.domain.Room;
import smilegate.seagull.room.service.RoomService;
import smilegate.seagull.user.domain.User;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.Charset;

import static java.util.Collections.singletonList;
import static org.springframework.http.MediaType.APPLICATION_OCTET_STREAM;
import static org.springframework.http.MediaType.asMediaType;

@Repository
@RequestMapping("/room")
public class RoomController {

    @Autowired
    private RoomService roomService;

    @PostMapping("/create")
    public ResponseEntity<Room> createRoom(@RequestParam(value = "roomName") String roomName, HttpServletResponse response) {
        User user = new User(1L, "tjdwns", "email@email.com");
        String roomLink = roomService.generateRoom(user);
        Room room = roomService.createRoom(user, roomName, roomLink);

        HttpHeaders headers= new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));

        return new ResponseEntity<Room>(room, headers, HttpStatus.OK);
    }

    @PostMapping("/delete")
    public void deleteHostRoom(@RequestParam(value = "roomLink") String roomLink) {
        roomService.deleteRoom(roomLink);
    }

    @GetMapping("/exit")
    public void exitUser() {
        /**
         *  TODO
         *   - 캐시
         *   1. 방에 대한 데이터
         *   2. 모든 유저에 대한 데이터
         * **/
    }
}
