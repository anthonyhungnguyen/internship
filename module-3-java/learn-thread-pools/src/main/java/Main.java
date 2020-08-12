import java.util.concurrent.*;

public class Main {

    public static void main(String[] args){
//        ExecutorService executorService = Executors.newFixedThreadPool(10);
//        Future<String> future = executorService.submit(() -> "Hello World");
//        String result = future.get();
//        System.out.println(result);

        ThreadPoolExecutor executor = (ThreadPoolExecutor) Executors.newFixedThreadPool(2);
        executor.submit(() -> {
            Thread.sleep(1000);
            return null;
        });

        executor.submit(() -> {
            Thread.sleep(1000);
            return null;
        });
        executor.submit(() -> {
            Thread.sleep(1000);
            return null;
        });
        System.out.println(executor.getPoolSize());
        System.out.println(executor.getQueue().size());
    }
}
