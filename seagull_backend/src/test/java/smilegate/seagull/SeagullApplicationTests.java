package smilegate.seagull;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import smilegate.seagull.room.domain.Room;
import smilegate.seagull.room.repository.RoomRedisRepository;
import smilegate.seagull.user.domain.User;

import java.net.URLDecoder;
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.Random;

import static org.assertj.core.api.Assertions.assertThat;


@SpringBootTest
class SeagullApplicationTests {

	@Autowired
	private RoomRedisRepository roomRedisRepository;

	@Test
	void contextLoads() {
		byte[] array = new byte[7]; // length is bounded by 7
		String originalInput = "tjdwns4537";
		String encodedString = Base64.getEncoder().encodeToString(originalInput.getBytes());
		System.out.println(encodedString);

//		Room room = new Room();
//		User user = new User(1L,"a","b");
//
//		room.setHostId(user.getId());
////		room.setRoomName("roomName");
//		room.setRoomLink("link");
//		Room result = roomRedisRepository.save(room);
//
//		assertThat(result).isEqualTo(room);
	}

}
