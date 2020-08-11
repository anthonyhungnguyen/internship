import junit.framework.TestCase;
import org.junit.Test;

public class TestCalculateMilliSinceEpoch extends TestCase {
    public TestCalculateMilliSinceEpoch(String datetime) {
        super(datetime);
    }
    @Test
    public void testNormalDateTime() {
        long milliSinceEpoch = CalculateMilliSinceEpoch.compute("2020/08/11 15:51:37");
        long expected = 1597135897000L;
        assertEquals(milliSinceEpoch, expected);
    }
    @Test
    public void testNullDateTime() throws Exception {
        try {
            long milliSinceEpoch = CalculateMilliSinceEpoch.compute(null);
            fail("Not throw exception");
        } catch(Exception e) {
            assertTrue(e, instanceof(NullPointerException.class));
        }
        long expected = 1597135897000L;
        assertEquals(milliSinceEpoch, expected);
    }
}
