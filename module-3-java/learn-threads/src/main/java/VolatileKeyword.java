public class VolatileKeyword {
    private volatile static int COUNT = 0;

    // Volatile helps threads read the most recent written values
    // on main memory, not on a single thread cache.

    public static void main(String[] args) {
        new ChangeListener().start();
        new ChangeMaker().start();
    }

    static class ChangeListener extends Thread {
        @Override
        public void run() {
            int value = COUNT;
            while (value < 10) {
                if(value != COUNT) {
                    System.out.println("Count variable changed to: " + COUNT);
                    value = COUNT;
                }
            }
        }
    }

    static class ChangeMaker extends Thread {
        @Override
        public void run() {
            int value = COUNT;
            while(COUNT < 10) {
                System.out.println("Increasing value of count variable to " + (value + 1));
                COUNT = ++value;
                try {
                    Thread.sleep(500);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        }
    }
}
