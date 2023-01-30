package smilegate.seagull.util;

public class KafkaConstants {
    /*TODO
    *  1. 토픽 생성
    *  ./kafka-topics.sh --create --bootstrap-server 52.201.218.52:9092 --replication-factor 1 --partitions 1 --topic kafka-chat
    *  2. 토픽 조회
    *  ./kafka-console-consumer.sh --bootstrap-server 52.201.218.52:9092 --topic kafka-chat --from-beginning
     * */
    public static final String KAFKA_TOPIC = "kafka-chat"; // 생성한 토픽의 이름
    public static final String GROUP_ID = "chatting"; // consumer를 식별할 수 있는 그룹
    public static final String KAFKA_BROKER = "52.201.218.52:9092"; // Kafka 클러스터에 연결하기 위한 호스트:포트 값
}
