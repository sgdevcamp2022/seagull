package smilegate.seagull.room.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import smilegate.seagull.room.domain.Room;
import smilegate.seagull.room.domain.RoomUser;
import smilegate.seagull.room.service.EnterUserService;
import smilegate.seagull.room.service.RoomService;

import java.nio.charset.Charset;
import java.util.Set;

@Slf4j
@Controller
@RequestMapping("/room")
@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*")
public class RoomController {

    private final RoomService roomService;
    private final EnterUserService enterUserService;

    @Autowired
    public RoomController(RoomService roomService, EnterUserService enterUserService) {
        this.roomService = roomService;
        this.enterUserService = enterUserService;
    }

    @PostMapping("/create/{user_id}") //ROOM -> ROOMUSER 수정
    public ResponseEntity<RoomUser> createRoom(@PathVariable(value = "user_id") String userId) {
//        RoomUser roomUser = roomService.createRoom(userId);
        RoomUser roomUser = enterUserService.enter(userId);
        HttpHeaders headers= new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));

        return new ResponseEntity<>(roomUser, headers, HttpStatus.OK);
    }

//    @PostMapping("{roomLink}")
//    public ResponseEntity<Set<String>> enterRoom(@PathVariable(value = "roomLink") String roomLink, @RequestBody RoomUser roomUser) {
//        enterUserService.enter(roomUser);
//        Set<String> allUser = enterUserService.getAllUser(roomLink);
//        HttpHeaders headers= new HttpHeaders();
//        headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));
//        return new ResponseEntity<>(allUser, headers, HttpStatus.OK);
//    }

    @GetMapping("/list/{roomLink}")
    public ResponseEntity<Set<String>> getRoomList(@PathVariable(value = "roomLink") String roomLink) {
        Set<String> allUser = enterUserService.getAllUser(roomLink);
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));
        if(!allUser.isEmpty()) return new ResponseEntity<>(allUser, headers, HttpStatus.OK);
        return new ResponseEntity<>(headers, HttpStatus.NOT_FOUND);
    }

    @GetMapping("/count/{roomLink}")
    public ResponseEntity<Integer> getRoomCount(@PathVariable(value = "roomLink") String roomLink) {
        Integer userNum = enterUserService.countUser(roomLink);
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));
        return new ResponseEntity<>(userNum, headers, HttpStatus.OK);
    }
}
