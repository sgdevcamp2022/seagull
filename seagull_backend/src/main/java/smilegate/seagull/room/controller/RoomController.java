package smilegate.seagull.room.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.*;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Repository;
import org.springframework.util.MimeType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;
import smilegate.seagull.room.domain.Room;
import smilegate.seagull.room.domain.RoomDto;
import smilegate.seagull.room.domain.RoomUser;
import smilegate.seagull.room.service.RoomService;
import smilegate.seagull.user.domain.User;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.nio.charset.Charset;
import java.util.Collection;
import java.util.Optional;

@Slf4j
@Controller
@RequestMapping("/room")
@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*")
public class RoomController {

    @Autowired
    private RoomService roomService;

    @Autowired
    private SimpMessageSendingOperations roomTemplate;

    @PostMapping("/create/{user_id}")
    public ResponseEntity<Room> createRoom(@PathVariable(value = "user_id") String userId) {
        /**
         *  TODO
         *   - user api 완성되면 그 데이터를 받아와 user에 할당
         * **/
        Room room = roomService.createRoom(userId);
        log.info("roomHost : {}",room.getHostId());
        log.info("roomLink : {}",room.getRoomLink());
        HttpHeaders headers= new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));

        return new ResponseEntity<>(room, headers, HttpStatus.OK);
    }

//    @PostMapping("/delete")
//    public void deleteHostRoom(@RequestParam(value = "roomId") Long roomId) {
//        roomService.deleteRoom(roomId);
//    }

    @GetMapping("{roomLink}")
    public ResponseEntity<Optional<Room>> enterRoom(@PathVariable(value = "roomLink") String roomLink) {
        Optional<Room> room = roomService.findRoomLink(roomLink);
        log.info("room: {}", room.get().getRoomLink());
        HttpHeaders headers= new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));

        if (room.isPresent()) {
            return new ResponseEntity<>(room, headers, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

//    @PostMapping({"{roomId}"})
//    public ResponseEntity<Optional<Room>> enterRoomId(@PathVariable("roomId") Long roomId) {
//        Optional<Room> room = roomService.findById(roomId);
//
//        HttpHeaders httpHeaders = new HttpHeaders();
//        httpHeaders.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));
//        return new ResponseEntity<>(room, httpHeaders, HttpStatus.OK);
//    }

//    @MessageMapping("/enterRoom/{roomLink}") // 클라이언트에서 보내는 메세지 매핑
//    public void enterRoom(@DestinationVariable(value = "roomLink") String roomLink, @Payload RoomUser roomUser) {
//        log.info("{} 가 {} 방에 들어옴", roomUser.getUserId(), roomLink);
//        roomTemplate.convertAndSend("/topic/room/" + roomLink, roomUser);
//    }

    @MessageMapping("/enterRoom/{roomLink}") // 클라이언트에서 보내는 메세지 매핑
    public RoomDto enterRoom(@DestinationVariable(value = "roomLink") String roomLink, @Payload RoomDto roomDto) {
        log.info("{} 가 {} 방에 들어옴", roomDto.getHostId(), roomLink);
        roomTemplate.convertAndSend("/topic/room/" + roomLink, roomDto);
        return roomDto;
    }


    @MessageMapping("/enterRoom") // 클라이언트에서 보내는 메세지 매핑
    public void enter(@Payload RoomUser roomUser) {
        log.info("{} 가 {} 방에 들어옴", roomUser.getUserId(), roomUser.getRoomId());
//        roomTemplate.convertAndSend("/topic/room/" + roomUser.getRoomId(), roomUser);
    }

}
