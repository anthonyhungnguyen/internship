package com.company.vng;

public class CountDownThread extends Thread {
    @Override
    public void run() {
        int count = 10;
        for (int i = count; i > 0; i--) {
            System.out.println(i + " Thread name: " + Thread.currentThread().getName());
            try{
                Thread.sleep(1000);
            } catch(InterruptedException e){
                e.printStackTrace();
            }
        }
        System.out.println("Time's up");
    }
}
