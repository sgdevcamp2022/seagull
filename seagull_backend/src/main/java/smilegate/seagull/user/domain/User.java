package smilegate.seagull.user.domain;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class User {

    private String nickname;
    private String user_tpye;
    private Integer user_status;
    private String email;
    private String user_id;
    private String encrypted_password;
}
