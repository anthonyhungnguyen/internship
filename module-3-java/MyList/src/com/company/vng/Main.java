package com.company.vng;


public class Main {

    public static void main(String[] args) {
	// write your code here
        MyList<Integer> myList = new MyList<>();

        // Test add(T t)
        myList.add(10);
        myList.add(20);
        System.out.println(myList);
        System.out.println(myList.isEmpty());

        // Test get/set
        System.out.println(myList.get(0));
        System.out.println(myList.get(1));
        System.out.println(myList.set(1, 30));
        System.out.println(myList);

        // Test indexOf(Object o) | contains(Object o)
        System.out.println(myList.indexOf(20));
        System.out.println(myList.indexOf(30));
        System.out.println(myList.contains(20));
        System.out.println(myList.contains(30));

        // Test remove(int index) | remove(Object o)
        myList.remove(1);
        System.out.println(myList);
        myList.remove(new Integer(10));
        System.out.println(myList);


        // Test clear()
        myList.add(10);
        myList.add(20);
        myList.add(30);
        myList.add(40);
        System.out.println(myList);
        myList.clear();
        System.out.println(myList);

        // Test add(int index, T t)
        myList.add(0, 40);
        System.out.println(myList);

        // Test containsAll
        MyList<Integer> a = new MyList<>();
        a.add(40);
        System.out.println(myList.containsAll(a));

        // Test addAll
        a.add(10);
        a.add(20);
        a.add(30);
        myList.addAll(a);
        System.out.println(myList);
        myList.addAll(3, a);
        System.out.println(myList);

        // Test removeAll
        myList.add(100);
//        myList.removeAll(a);
//        System.out.println(myList);

        myList.retainAll(a);
        System.out.println(myList);
    }
}
