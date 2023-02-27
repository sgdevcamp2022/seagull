package smilegate.seagull.room.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import smilegate.seagull.room.repository.RoomVideoRepository;

@Service
public class VideoService {

    private final RoomVideoRepository roomVideoRepository;

    @Autowired
    public VideoService(RoomVideoRepository roomVideoRepository) {
        this.roomVideoRepository = roomVideoRepository;
    }

    public void saveUrl(String roomLink, String url){
        roomVideoRepository.setURL(roomLink,url);
    }

    public void deleteUrlAll(String roomLink) {
        roomVideoRepository.deleteUrlAll(roomLink);
    }

    public String getURL(String roomLink) {
        return roomVideoRepository.findByRoomLink(roomLink);
    }
}
