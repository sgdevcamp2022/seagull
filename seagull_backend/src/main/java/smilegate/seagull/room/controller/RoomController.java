package smilegate.seagull.room.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.*;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Repository;
import org.springframework.util.MimeType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;
import smilegate.seagull.room.domain.Room;
import smilegate.seagull.room.service.RoomService;
import smilegate.seagull.user.domain.User;
import javax.servlet.http.HttpServletResponse;
import java.nio.charset.Charset;

@Controller
@RequestMapping("/room")
public class RoomController {

    @Autowired
    private RoomService roomService;

    @PostMapping("/create")
    public ResponseEntity<Room> createRoom(String userId, HttpServletResponse response) {
        /**
         *  TODO
         *   - user api 완성되면 그 데이터를 받아와 user에 할당
         * **/

        User tempUser = new User(1L, "tjdwns", "email@email.com");
        String roomLink = roomService.generateRoom(tempUser);
        Room room = roomService.createRoom(tempUser, roomLink);

        HttpHeaders headers= new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));

        return new ResponseEntity<Room>(room, headers, HttpStatus.OK);
    }

    @PostMapping("/delete")
    public void deleteHostRoom(@RequestParam(value = "roomLink") String roomLink) {
        roomService.deleteRoom(roomLink);
    }

    @GetMapping("{roomLink}")
    public  ResponseEntity<Room> enterRoom(@PathVariable(value = "roomLink") String roomLink, HttpServletResponse response) {
        Room room = roomService.findRoom(roomLink);

        HttpHeaders headers= new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));
        if (room != null) {
            return new ResponseEntity<Room>(room, headers, HttpStatus.OK);
        }
        return new ResponseEntity<Room>(room, headers, HttpStatus.NOT_FOUND);
    }
}
