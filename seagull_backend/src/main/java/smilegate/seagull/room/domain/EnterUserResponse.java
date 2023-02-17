package smilegate.seagull.room.domain;

import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter @Setter
public class EnterUserResponse {
    private List<String> users = new ArrayList<String>();
    private String url;

    public EnterUserResponse() {

    }

    public EnterUserResponse(List<String> users, String url) {
        this.users = users;
        this.url = url;
    }

    public static EnterUserResponse of(List<String> users, String url) {
        return new EnterUserResponse(users, url);
    }
}
