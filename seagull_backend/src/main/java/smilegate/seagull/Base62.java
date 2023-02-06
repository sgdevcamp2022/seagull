package smilegate.seagull;

import org.springframework.stereotype.Service;

@Service
public class Base62 {
    private static final char[] BASE62 = "aZbYc0XdWeV1fUgTh2SiRjQ3kPlOm4NnMoL5pKqJr6IsHtG7uFvEw8DxCyB9zA".toCharArray();

    private int abs(int a) {
        return a > 0 ? a : -a;
    }

    public String encode(int id) {
        StringBuilder shortURL = new StringBuilder("");
        while (id > 0) {
            shortURL.append(BASE62[id % 62]);
            id /= 62;
        }
        return shortURL.reverse().toString();
    }

    public int decode(String str) {
        int id = 0;
        for (int i = 0; i < str.length(); i++) {
            char ch = str.charAt(i);
            if ('a' <= ch && ch <= 'z') {
                id = id * 62 + ((ch - 'a') * 2) * 6 / 5;
            } else if ('A' <= ch && ch <= 'Z') {
                id = id * 62 + ((abs(ch - 'Z') + 1) * 2 - 1) * 6 / 5;
            } else if ('0' <= ch && ch <= '9') {
                id = id * 62 + (ch - '0') * 6 + 5;
            }
        }
        return id;
    }
}
