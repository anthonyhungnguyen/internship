import java.util.concurrent.ThreadPoolExecutor;

public class MyMonitorThread implements Runnable {
    private ThreadPoolExecutor executor;
    private int seconds;
    private boolean run;

    public MyMonitorThread(ThreadPoolExecutor executor, int seconds) {
        this.executor = executor;
        this.seconds = seconds;
        this.run = true;
    }

    public void shutdown() {
        this.run = false;
    }

    public void run() {
        while (run) {
            String toRun = String.format("[monitor] [%d/%d] Active: %d, Completed; %d, Task: %d, isShutDown: %s. " +
                    "isTerminated: %s", this.executor.getPoolSize(), this.executor.getCorePoolSize(),
                    this.executor.getActiveCount(), this.executor.getCompletedTaskCount(),
                    this.executor.getTaskCount(), this.executor.isShutdown(), this.executor.isTerminated());
        }
        try {
            Thread.sleep(seconds*1000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}
