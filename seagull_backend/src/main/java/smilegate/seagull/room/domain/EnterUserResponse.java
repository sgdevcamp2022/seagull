package smilegate.seagull.room.domain;

import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter @Setter
public class EnterUserResponse {
    private List<String> users = new ArrayList<String>();
    private String url;
    private String hostName;

    public EnterUserResponse() {

    }

    public EnterUserResponse(List<String> users, String url, String hostName) {
        this.users = users;
        this.url = url;
        this.hostName = hostName;
    }

    public static EnterUserResponse of(List<String> users, String url, String hostName) {
        return new EnterUserResponse(users, url, hostName);
    }
}
