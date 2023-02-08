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
import java.util.Optional;

@Controller
@RequestMapping("/room")
@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*")
public class RoomController {

    @Autowired
    private RoomService roomService;

    @PostMapping("/create/{user_id}")
    public ResponseEntity<Room> createRoom(@PathVariable(value = "user_id") String userId) {
        /**
         *  TODO
         *   - user api 완성되면 그 데이터를 받아와 user에 할당
         * **/

//        User tempUser = new User(5L, "tjdwns", "email@email.com");
        String roomLink = roomService.generateRoom(userId);
        Room room = roomService.createRoom(userId, roomLink);
        HttpHeaders headers= new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));

        return new ResponseEntity<>(room, headers, HttpStatus.OK);
    }

    @PostMapping("/delete")
    public void deleteHostRoom(@RequestParam(value = "roomLink") String roomLink) {
        roomService.deleteRoom(roomLink);
    }

    @PostMapping("{roomLink}")
    public ResponseEntity<Optional<Room>> enterRoom(@PathVariable(value = "roomLink") String roomLink, HttpServletResponse response) {
        Optional<Room> room = roomService.findRoom(roomLink);
        HttpHeaders headers= new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));
        if (room.isPresent()) {
            return new ResponseEntity<>(room, headers, HttpStatus.OK);
        }
        return new ResponseEntity<>(room, headers, HttpStatus.NOT_FOUND);
    }
}
