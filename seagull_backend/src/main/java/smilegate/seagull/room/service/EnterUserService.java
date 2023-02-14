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

    /**
     * TODO
     *  - 참여자 목록 관리
     *  - 레디스에 세션을 저장함으로써 참여자를 관리
     *  - host는 무조건 set하고 get 해줘서 빈 set이 나오지 않게 해야됨
     * **/

    private final RoomUserRedisRepository roomUserRedisRepository;

    @Autowired
    public EnterUserService(RoomUserRedisRepository roomUserRedisRepository) {
        this.roomUserRedisRepository = roomUserRedisRepository;
    }


    public RoomUser enter(String userId) {
        String roomLink = RoomService.generateRoomLink(userId);
        RoomUser roomUser = new RoomUser(roomLink,userId);
        roomUserRedisRepository.setSets(roomUser.getRoomLink(), roomUser.getUserId());
        return roomUser;
    }

    public void enter(RoomUser roomUser) {
        roomUserRedisRepository.setSets(roomUser.getRoomLink(), roomUser.getUserId());
    }

    public void saveSession(RoomUser roomUser) {
        roomUserRedisRepository.setValues(roomUser);
    }

    public String findBySession(String session) {
        return roomUserRedisRepository.getValues(session);
    }

    public Set<String> getAllUser(String roomLink) {
        Set<String> allSets = roomUserRedisRepository.getAllSets(roomLink);
        for(String i : allSets){
            log.info("set : {}",i);
        }
        return allSets;
    }

    public Boolean isExistRoom(String roomLink) {
        Long setSize = roomUserRedisRepository.getSetSize(roomLink);
        if(setSize == 0L) return false;
        return true;
    }

    public Integer countUser(String roomLink) {
        Set<String> allUser = getAllUser(roomLink);
        return allUser.size();
    }

    public Set<String> deleteUser(RoomUser roomUser) {
        return roomUserRedisRepository.deleteSets(roomUser.getRoomLink(), roomUser.getUserId());
    }
}
