package smilegate.seagull.room.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.*;
import smilegate.seagull.room.service.RoomService;
import smilegate.seagull.user.domain.User;

@Repository
@RequestMapping("/room")
public class RoomController {

    @Autowired
    private RoomService roomService;

    @PostMapping("/create")
    public void createRoom(@RequestParam(value = "roomName") String roomName) {
        User user = new User(1L, "tjdwns", "email@email.com");
        String roomLink = roomService.generateRoom();
        roomService.createRoom(user,roomName,roomLink);
    }

    @GetMapping("/create/{roomLink}")
    public void enterRoom(@PathVariable) {

    }

    @PostMapping("/delete")
    public void deleteHostRoom(@PathVariable(value = "roomLink") String roomLink) {
        roomService.deleteRoom(roomLink);
    }

    @GetMapping("/exit")
    public void exitUser() {

    }
}
