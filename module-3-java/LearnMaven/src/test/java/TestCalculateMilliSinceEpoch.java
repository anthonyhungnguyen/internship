import junit.framework.TestCase;
import org.junit.jupiter.api.Test;

import java.time.DateTimeException;

import static org.junit.jupiter.api.Assertions.*;

// Parse Date automatically change 31Feb to 29/28Feb

public class TestCalculateMilliSinceEpoch extends TestCase {
    @Test
    public void testNormalDateTime() {
        long milliSinceEpoch = CalculateMilliSinceEpoch.compute("2020/08/11 15:51:37");
        long expected = 1597135897000L;
        assertEquals(milliSinceEpoch, expected);
    }
    @Test
    public void testNullDateTime() {
        Exception exception = assertThrows(NullPointerException.class, () -> {
            CalculateMilliSinceEpoch.compute(null);
        });
        String exceptedMessage = "Datetime mustn't be null";
        String actualMessage = exception.getMessage();
        assertTrue(actualMessage.equals(exceptedMessage));
    }

    @Test
    public void testBlankDateTime() {
        Exception exception = assertThrows(DateTimeException.class, () -> {
            CalculateMilliSinceEpoch.compute("");
        });
        String exceptedMessage = "Please re-check your DateTime";
        String actualMessage = exception.getMessage();
        assertTrue(actualMessage.equals(exceptedMessage));
    }

    @Test
    public void testDateTimeWrongFormat() {
        Exception exception = assertThrows(DateTimeException.class, () -> {
            CalculateMilliSinceEpoch.compute("2020/08/11");
        });
        String expectedMessage = "Please re-check your DateTime";
        String actualMessage = exception.getMessage();
        assertTrue(actualMessage.equals(expectedMessage));
    }

    @Test
    public void testDateTimeWrongFieldValue() {
        Exception exception = assertThrows(DateTimeException.class, () -> {
            CalculateMilliSinceEpoch.compute("2020/13/11 02:02:02");
        });
        String expectedMessage = "Please re-check your DateTime";
        String actualMessage = exception.getMessage();
        assertTrue(actualMessage.equals(expectedMessage));
    }

}
