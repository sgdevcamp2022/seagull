package smilegate.seagull.room.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import smilegate.seagull.room.domain.RoomUser;
import smilegate.seagull.room.domain.UrlJsonParsingObject;
import smilegate.seagull.room.service.EnterUserService;
import smilegate.seagull.room.service.RoomService;
import smilegate.seagull.room.service.VideoService;

import java.nio.charset.Charset;

@Slf4j
@Controller
@RequestMapping("/room")
@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*")
public class RoomController {
    private final RoomService roomService;
    private final EnterUserService enterUserService;
    private final SimpMessageSendingOperations roomTemplate;
    private final VideoService videoService;

    @Autowired
    public RoomController(RoomService roomService,
                          EnterUserService enterUserService,
                          SimpMessageSendingOperations roomTemplate,
                          VideoService videoService) {
        this.roomService = roomService;
        this.enterUserService = enterUserService;
        this.roomTemplate = roomTemplate;
        this.videoService = videoService;
    }

    @PostMapping("/create/{user_id}") //ROOM -> ROOMUSER 수정
    public ResponseEntity<RoomUser> createRoom(@PathVariable(value = "user_id") String userId) {
        RoomUser roomUser = roomService.createRoom(userId);
        HttpHeaders headers= new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));

        return new ResponseEntity<>(roomUser, headers, HttpStatus.OK);
    }

    @PostMapping("/video/{roomLink}")
    public ResponseEntity<HttpStatus> saveVideoURL(
            @PathVariable(value = "roomLink") String roomLink,
            @RequestBody String url) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        UrlJsonParsingObject urlParse = objectMapper.readValue(url, UrlJsonParsingObject.class);
        videoService.saveUrl(roomLink,urlParse.getUrl());
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
