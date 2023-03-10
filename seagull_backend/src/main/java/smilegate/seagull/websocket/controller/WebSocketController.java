package smilegate.seagull.websocket.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.web.bind.annotation.RestController;
import smilegate.seagull.room.domain.EnterUserResponse;
import smilegate.seagull.room.domain.RoomUser;
import smilegate.seagull.room.service.EnterUserService;
import smilegate.seagull.room.service.RoomService;
import smilegate.seagull.room.service.VideoService;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Slf4j
@RestController
public class WebSocketController {

    private final RoomService roomService;
    private final EnterUserService enterUserService;
    private final VideoService videoService;
    private final SimpMessageSendingOperations roomTemplate;


    @Autowired
    public WebSocketController(RoomService roomService, EnterUserService enterUserService, VideoService videoService, SimpMessageSendingOperations roomTemplate) {
        this.roomService = roomService;
        this.enterUserService = enterUserService;
        this.videoService = videoService;
        this.roomTemplate = roomTemplate;
    }

    @MessageMapping("/enterRoom/{roomLink}") // 클라이언트에서 보내는 메세지 매핑
    public void enterRoom(@DestinationVariable(value = "roomLink") String roomLink, @Payload RoomUser roomUser) {
        log.info("{} 가 {} 방에 들어옴", roomUser.getUserId(), roomLink);
        enterUserService.saveUser(roomUser);
        Set<String> allUser = enterUserService.getAllUser(roomUser.getRoomLink());
        List<String> users = new ArrayList<>(allUser); // set -> list
        String url = videoService.getURL(roomLink);
        String hostName = roomService.findHost(roomLink);
        EnterUserResponse userResponse = EnterUserResponse.of(users, url, hostName);
        log.info("URL : {}", url);
        log.info("Response JSON : {}",userResponse);
        roomTemplate.convertAndSend("/subscribe/room/" + roomUser.getRoomLink(), userResponse);
    }

    @MessageMapping("/exit/{roomLink}")
    public void exitRoom(@DestinationVariable(value = "roomLink") String roomLink, @Payload RoomUser roomUser) {
        log.info("User Disconnected roomId : {}, roomLink : {}", roomUser.getUserId(), roomUser.getRoomLink());

        if (roomService.findByHost(roomUser.getRoomLink(), roomUser.getUserId())) {
            enterUserService.deleteUserAll(roomLink);
            roomService.deleteRoom(roomLink);
            videoService.deleteUrlAll(roomLink);
            roomTemplate.convertAndSend("/subscribe/room/" + roomLink, "exit");
        }
        if (!roomService.findByHost(roomUser.getRoomLink(), roomUser.getUserId())){
            enterUserService.deleteUser(roomUser);
            Set<String> allUser = enterUserService.getAllUser(roomUser.getRoomLink());
            List<String> users = new ArrayList<>(allUser);
            String url = videoService.getURL(roomLink);
            String hostName = roomService.findHost(roomLink);
            EnterUserResponse userResponse = EnterUserResponse.of(users, url,hostName);
            roomTemplate.convertAndSend("/subscribe/room/" + roomLink, userResponse);
        }
    }
}
