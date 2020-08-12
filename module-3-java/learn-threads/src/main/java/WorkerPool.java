import java.util.concurrent.*;

public class WorkerPool {
    public static void main(String[] args) throws InterruptedException {
        RejectedExecutionHandler rejectedExecutionHandler = new RejectedExecutionHandlerImpl();
        ThreadFactory threadFactory = Executors.defaultThreadFactory();
        ThreadPoolExecutor executor = new ThreadPoolExecutor(2, 4, 10, TimeUnit.SECONDS,
                new ArrayBlockingQueue<Runnable>(2), threadFactory, rejectedExecutionHandler);
        MyMonitorThread monitor = new MyMonitorThread(executor, 3);
        Thread monitorThread = new Thread(monitor);
        monitorThread.start();
        for (int i = 0; i < 10; i++) {
            executor.execute(new WorkerThread("cmd" + i));
        }
        Thread.sleep(30000);
        executor.shutdown();
        Thread.sleep(5000);
        monitor.shutdown();
    }
}
