public class Synchronized {
    private int count = 0;

    // method synchronized will only be called only one at once
    // guarantee no race condition happens
    // The output will always be 2000

    public synchronized void increment(){
        count++;
    }

    public void doWork() {
        Thread t1 = new Thread(new Runnable() {
            public void run() {
                for (int i = 0; i < 1000; i++) {
                    increment();
                }
            }
        });

        Thread t2 = new Thread(new Runnable() {
            public void run() {
                for (int i = 0; i < 1000; i++) {
                    increment();
                }
            }
        });

        t1.start();
        t2.start();

        try {
            t1.join();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        try {
            t2.join();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        System.out.println("Final value of count: " + count);
    }

    public static void main(String[] args){
        Synchronized syn = new Synchronized();
        syn.doWork();
    }
}
