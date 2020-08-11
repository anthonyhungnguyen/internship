package com.company.vng;

import javax.swing.text.DateFormatter;
import java.time.*;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.function.Consumer;
import java.util.stream.Collector;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class Main {

    public static void main(String[] args) {
//        CountDownThread countDownThread1 = new CountDownThread();
//        countDownThread1.start();
//
//        CountDownThread countDownThread2 = new CountDownThread();
//        countDownThread2.start();
//
//        CountDownThreadRunnable countDownThreadRunnable = new CountDownThreadRunnable();
//        Thread thread = new Thread(countDownThreadRunnable);
//        thread.start();

        ArrayList<Integer> numbers = new ArrayList<>();

        numbers.add(5);
        numbers.add(9);
        numbers.add(8);
        numbers.add(1);

        // java.util.function.Consumer
        // comparing consumer, printing list
        numbers.forEach(n -> System.out.println(n));
        System.out.println("-----");

        // java.util.function.Predicate
        // comparing predicate, for filtering
        numbers.removeIf(t -> t > 8);
        numbers.forEach(t -> System.out.println(t));

        // java.util.function.Function
        // converting to uppercase
        ArrayList<String> strings = new ArrayList<>();
        Stream<String> stream = strings.stream();
        strings.add("hello");
        strings.add("world");
        stream.map(t -> t.toUpperCase()).forEach(t -> System.out.println(t));

        // java.util.function.Supplier
        Random random = new Random();
        Stream<Integer> intStream;
        intStream = Stream.generate(() -> random.nextInt(10)).limit(5);
        intStream.forEach(t -> System.out.println(t + " "));

        // lambda expression to implement FuncInterface. This interface by default implements
        // abstractFun()
        FuncInterface fobj = x -> System.out.println(x);
        fobj.abstractFunc(530);

        // Test stream

        // List of integers and map method
        List<Integer> testStream = Arrays.asList(2, 3, 4, 5);
        List<Integer> square = testStream.stream().map(n -> n * n).collect(Collectors.toList());
        System.out.println(square);

        // List of strings and filter, sorted method
        List<String> names = Arrays.asList("Reflection", "Collection", "Stream");
        List<String> result = names.stream().filter(s -> s.startsWith("S")).collect(Collectors.toList());
        System.out.println(result);

        List<String> strSorted = names.stream().sorted().collect(Collectors.toList());
        System.out.println(strSorted);

        // Return a set
        Set<Integer> squareSet = testStream.stream().map(i -> i * i).collect(Collectors.toSet());
        System.out.println(squareSet);

        int even = squareSet.stream().reduce(0, (ans, i) -> ans + i);
        System.out.println(even);

        // Using optional class to handle exception
        String[] words = new String[10];
        Optional<String> checkNull = Optional.ofNullable(words[5]);
        if (checkNull.isPresent()) {
            String word = words[5].toLowerCase();
            System.out.print(word);
        } else {
            System.out.println("word is null");
        }

        // new DateTime api

        // current date
        LocalDate date = LocalDate.now();
        System.out.println(date);

        // current time
        LocalTime time = LocalTime.now();
        System.out.println(time);

        // current date and time
        LocalDateTime current = LocalDateTime.now();
        System.out.println(current);

        // DateTime formatter
        DateTimeFormatter format = DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm:ss");
        String formattedDateTime = current.format(format);
        System.out.println(formattedDateTime);

        // get month, day, second
        Month month = current.getMonth();
        int day = current.getDayOfMonth();
        int seconds = current.getSecond();
        System.out.println("Month: " + month + " day: " + day + " seconds: " + seconds);

        // Specific date
        LocalDate date2 = LocalDate.of(1950,1,26);
        System.out.println(date2);

        // Zone Time
        ZonedDateTime currentZone = ZonedDateTime.now();
        ZoneId tokyo = ZoneId.of("Asia/Tokyo");
        ZonedDateTime tokyoZone = currentZone.withZoneSameInstant(tokyo);
        System.out.println(tokyoZone);
    }
}
