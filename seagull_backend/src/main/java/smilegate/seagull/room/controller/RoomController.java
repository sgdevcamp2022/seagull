package smilegate.seagull.room.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import smilegate.seagull.room.domain.Room;
import smilegate.seagull.room.domain.RoomUser;
import smilegate.seagull.room.service.RoomService;

import java.nio.charset.Charset;
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

    @MessageMapping("/enterRoom/{roomLink}") // 클라이언트에서 보내는 메세지 매핑
    public void enterRoom(@DestinationVariable(value = "roomLink") String roomLink,
                          @Payload RoomUser roomUser,
                          SimpMessageHeaderAccessor headerAccessor
                          ) {
        log.info("{} 가 {} 방에 들어옴", roomUser.getUserId(), roomLink);
        Optional<Room> room = roomService.findRoomLink(roomLink);
        if(room.isPresent()){
            headerAccessor.getSessionAttributes().put("username", roomUser.getUserId()); // Session에 유저를 추가해줍니다.
            roomTemplate.convertAndSend("/subscribe/room/" + roomUser.getRoomId(), roomUser);
        }
        roomTemplate.convertAndSend("/subscribe/room/" + roomUser.getRoomId(), "");
    }

    @GetMapping("{roomLink}")
    public ResponseEntity<?> enterRoom(@PathVariable(value = "roomLink") String roomLink) {
        HttpHeaders headers= new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));
        return new ResponseEntity<>(headers, HttpStatus.OK);
    }
}
