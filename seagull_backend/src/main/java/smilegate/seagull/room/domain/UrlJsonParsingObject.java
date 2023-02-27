package smilegate.seagull.room.domain;

import lombok.Getter;
import org.springframework.stereotype.Service;

@Getter
@Service
public class UrlJsonParsingObject {
    private String url;
    private String address;
}
