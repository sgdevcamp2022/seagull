package smilegate.seagull.room.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import smilegate.seagull.redis.RedisDao;
import smilegate.seagull.room.domain.RoomUser;

import javax.annotation.PostConstruct;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@Service
public class EnterUserService {

    /**
     * TODO
     *  - 참여자 목록 관리
     *  - 레디스에 세션을 저장함으로써 참여자를 관리
     *  - host는 무조건 set하고 get 해줘서 빈 set이 나오지 않게 해야됨
     * **/

    private RedisDao redisDao;

    @Autowired
    public EnterUserService(RedisDao redisDao) {
        this.redisDao = redisDao;
    }

    public void enter(RoomUser roomUser) {
        redisDao.setSets("roomLink-" + roomUser.getRoomLink(), roomUser.getUserId());
    }

    public Set<String> getAllUser(String roomLink) {
        return redisDao.getAllSets(roomLink);
    }

    public Integer countUser(String roomLink) {
        Set<String> allUser = getAllUser(roomLink);
        return allUser.size();
    }
}
