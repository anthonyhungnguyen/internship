import java.time.DateTimeException;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

public class CalculateMilliSinceEpoch {

    private final static ZoneId zoneId = ZoneId.of("Asia/Ho_Chi_Minh");
    private final static DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss");
    private final static Logger logger = LogManager.getLogger(CalculateMilliSinceEpoch.class);

    public static long compute(String datetime) {
        try {
            LocalDateTime parseDate = LocalDateTime.parse(datetime, formatter);
            long milliSinceEpoch = parseDate.atZone(zoneId).toInstant().toEpochMilli();
            logger.info("Success: " + datetime + " to: " + milliSinceEpoch);
            return milliSinceEpoch;
        }
        catch(NullPointerException e) {
            logger.error("DateTime is null");
            throw new NullPointerException("Datetime mustn't be null");
        }
        catch (DateTimeParseException e) {
            logger.error("DateTime is blank or wrong format: " + datetime);
            throw new DateTimeException("Please re-check your DateTime");
        }
    }
}
