import java.io.BufferedInputStream;
import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.*;

public class Demo {
    public static void main(String[] args) throws IOException {

        // Test passed by value
//        Balloon red = new Balloon("Red");
//        Balloon blue = new Balloon("Blue");
//
//        swap(red, blue);
//        System.out.println("Red color = " + red.getColor());
//        System.out.println("Blue color = " + blue.getColor());
//
//        foo(blue);
//        System.out.println("Blue color = " + blue.getColor());

        // Test checked exception
//        FileReader file = new FileReader("~/Desktop/token.txt");
//        BufferedReader fileInput = new BufferedReader(file);
//
//        for (int counter = 0; counter < 3; counter++) {
//            System.out.println(fileInput.readLine());
//        }
//
//        fileInput.close();

        // Test un-checked exception
//        int x = 0;
//        int y = 10;
//        int z = y/x;

//        List<String> arrayList = new ArrayList<>();
//        arrayList.add("PHP");
//        arrayList.add("Python");
//        arrayList.add("Java");
//        arrayList.add("C++");
//        System.out.println("Elements in ArrayList");
//        System.out.println("\t" + arrayList + "\n");
//
//        List<String> linkedList = new LinkedList<>();
//        linkedList.add("PHP");
//        linkedList.add("Python");
//        linkedList.add("Java");
//        linkedList.add("C++");
//        System.out.println("Elements in LinkedList");
//        System.out.println("\t" + linkedList + "\n");
//
//        Set<String> hashSet = new HashSet<>();
//        hashSet.add("PHP");
//        hashSet.add("Python");
//        hashSet.add("Java");
//        hashSet.add("Java");
//        hashSet.add("C++");
//        System.out.println("Elements in Set");
//        System.out.println("\t" + hashSet + "\n");
//
//        Map<String, String> hashMap = new HashMap<>();
//        hashMap.put("Windows", "2000");
//        hashMap.put("Windows", "XP");
//        hashMap.put("Language2", "Java");
//        hashMap.put("Language1", ".Net");
//        System.out.println("Elements in Map");
//        System.out.println("\t" + hashMap);
//        System.out.println(hashMap.size());
//
//        // Show list through Iterator
//        Iterator<String> itr = arrayList.iterator();
//        while (itr.hasNext()) {
//            System.out.println(itr.next() + ", ");
//        }
//
//        // Show list through for-each
//        System.out.println("\n");
//        for (String obj : arrayList) {
//            System.out.println(obj + ", ");
//        }
//
//        // Show list through index
//        System.out.println("\n");
//        int size = arrayList.size();
//        for (int counter = 0; counter < size; counter++) {
//            System.out.println(arrayList.get(counter) + ", ");
//        }
//        GenericClass<Integer> integerGenericClass = new GenericClass<>();
//        GenericClass<String> stringGenericClass = new GenericClass<>();
//
//        integerGenericClass.add(new Integer(10));
//        stringGenericClass.add(new String("Hello World"));
//        System.out.println(integerGenericClass.get());
//        System.out.println(stringGenericClass.get());

//        MyList<Integer> myList = new MyList<>();
//        MyList<Integer> anotherMyList = new MyList<>();
//        myList.add(10);
//        myList.add(11);
//        myList.add(12);
//        myList.add(13);
//        myList.add(14);
//
//        anotherMyList.add(15);
//        anotherMyList.add(16);
//        anotherMyList.add(17);
//        anotherMyList.add(18);
//        anotherMyList.add(19);

//        myList.printAll();
//        myList.remove(new Integer(10));
//        myList.printAll();
//        myList.remove(2);
//        myList.printAll();
//        myList.remove(10);

        Integer a = 200;
        Integer b = 200;

        System.out.println(a.equals(b));

//        myList.addAll(anotherMyList);
    }



    public static void swap(Object o1, Object o2) {
        Object temp = o1;
        o1 = o2;
        o2 = temp;
    }

    public static void foo(Balloon balloon) {
        balloon.setColor("Red");
        balloon = new Balloon("Green");

    }
}
