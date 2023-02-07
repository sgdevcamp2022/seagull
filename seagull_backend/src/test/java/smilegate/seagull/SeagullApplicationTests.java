package smilegate.seagull;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import smilegate.seagull.room.domain.Room;
import smilegate.seagull.room.repository.RoomRedisRepository;
import smilegate.seagull.user.domain.User;

import static org.assertj.core.api.Assertions.assertThat;


@SpringBootTest
class SeagullApplicationTests {

	@Autowired
	private RoomRedisRepository roomRedisRepository;

	@Test
	void contextLoads() {
		Room room = new Room();
		User user = new User(1L,"a","b");

		room.setRoomHost(user);
		room.setRoomName("roomName");
		room.setRoomLink("link");
		Room result = roomRedisRepository.save(room);

		assertThat(result).isEqualTo(room);
	}

}
