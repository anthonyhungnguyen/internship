import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;

public class CalculateMilliSinceEpoch {

    private final static ZoneId zoneId = ZoneId.of("Asia/Ho_Chi_Minh");
    private final static DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss");

    public static long compute(String datetime) {

        if (datetime.equals(null)) {
            throw new NullPointerException("Datetime mustn't be null")
        }

        LocalDateTime parseDate = LocalDateTime.parse(datetime, formatter);
        long milliSinceEpoch = parseDate.atZone(zoneId).toInstant().toEpochMilli();
        return milliSinceEpoch;
    }
}
