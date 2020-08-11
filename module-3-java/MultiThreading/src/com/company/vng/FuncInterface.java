package com.company.vng;

@FunctionalInterface
public interface FuncInterface {
    void abstractFunc(int x);

    default void normalFunc() {
        System.out.println("Hello");
    }
}
