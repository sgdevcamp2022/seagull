package smilegate.seagull.room.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import smilegate.seagull.room.domain.RoomUser;
import smilegate.seagull.room.repository.RoomUserRedisRepository;

import java.util.Set;

@Slf4j
@Service
public class EnterUserService {
    private final RoomUserRedisRepository roomUserRedisRepository;

    @Autowired
    public EnterUserService(RoomUserRedisRepository roomUserRedisRepository) {
        this.roomUserRedisRepository = roomUserRedisRepository;
    }

    public void saveUser(RoomUser roomUser) {
        roomUserRedisRepository.setUser(roomUser.getRoomLink(), roomUser.getUserId());
    }

    public Set<String> getAllUser(String roomLink) {
        return roomUserRedisRepository.getUserAll(roomLink);
    }


    public void deleteUser(RoomUser roomUser) {
        roomUserRedisRepository.deleteUser(roomUser.getRoomLink(), roomUser.getUserId());
    }

    public void deleteUserAll(String roomLink) {
        roomUserRedisRepository.deleteUserAll(roomLink);
    }
}
