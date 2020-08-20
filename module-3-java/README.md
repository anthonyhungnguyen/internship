<p style="font-size:30px;text-align:center;font-weight:bold;">Java Application</p>

- [Java Programming Language](#java-programming-language)
  - [What is Java?](#what-is-java)
  - [*Write once, run everywhere*](#write-once-run-everywhere)
  - [JDK, JRE and JVM](#jdk-jre-and-jvm)
    - [JVM (Java Virtual Machine)](#jvm-java-virtual-machine)
    - [JRE (Java Runtime Environment)](#jre-java-runtime-environment)
    - [JDK (Java Development Kit)](#jdk-java-development-kit)
  - [Java Compile and Run Process](#java-compile-and-run-process)
  - [Java Data Types](#java-data-types)
    - [Primitive types](#primitive-types)
    - [Non-primitives data type](#non-primitives-data-type)
  - [Java is Pass-by-Value](#java-is-pass-by-value)
  - [Exceptions](#exceptions)
    - [Error](#error)
    - [Exceptions](#exceptions-1)
      - [RuntimeException - unchecked exception](#runtimeexception---unchecked-exception)
      - [IOException - checked exception](#ioexception---checked-exception)
  - [Abstract vs Interface](#abstract-vs-interface)
    - [Interface](#interface)
    - [Abstract](#abstract)
    - [Comparison](#comparison)
    - [When to use which](#when-to-use-which)
  - [Java Collections](#java-collections)
    - [List](#list)
    - [Set](#set)
    - [Map](#map)
  - [Java Generics](#java-generics)
    - [How to use](#how-to-use)
    - [Creation](#creation)
    - [Bounded types](#bounded-types)
    - [Advantages](#advantages)
  - [Multithreading](#multithreading)
    - [Basic Multithreading](#basic-multithreading)
      - [Parallelism](#parallelism)
      - [Concurrency](#concurrency)
      - [Multithreading in Java is both Concurrency and Parallelism](#multithreading-in-java-is-both-concurrency-and-parallelism)
      - [Runnable vs Thread](#runnable-vs-thread)
    - [Advanced Multithreading](#advanced-multithreading)
      - [Thread safety](#thread-safety)
      - [Thread Pools](#thread-pools)
  - [Java 8 LTS](#java-8-lts)
    - [Lambda Expressions](#lambda-expressions)
      - [Functional Interface](#functional-interface)
      - [Definition](#definition)
      - [Usage](#usage)
      - [Types](#types)
    - [Default methods](#default-methods)
    - [Stream](#stream)
      - [Definition](#definition-1)
      - [Operations](#operations)
    - [Optional class](#optional-class)
    - [New DateTime API](#new-datetime-api)
      - [LocalDate](#localdate)
      - [LocalTime](#localtime)
      - [LocalDateTime](#localdatetime)
      - [ZonedDateTime](#zoneddatetime)
      - [Period](#period)
      - [Duration](#duration)
      - [Compatibility with Date and Calendar](#compatibility-with-date-and-calendar)
      - [Formatting](#formatting)
  - [Maven](#maven)
    - [Definition](#definition-2)
    - [Commands](#commands)
  - [Unit Test](#unit-test)
- [Models & Principles](#models--principles)
  - [Client-server model](#client-server-model)
    - [MVC vs MVVM](#mvc-vs-mvvm)
    - [HTTP, Websocket, gRPC](#http-websocket-grpc)
    - [SSL/TLS](#ssltls)
    - [RESTful API](#restful-api)
  - [Principles](#principles)
    - [SOLID](#solid)
    - [DRY and KISS](#dry-and-kiss)

# Java Programming Language

## What is Java?
- A object oriented programming language (OOP) based on class.
- Instead of compiling source code to machine code when running, Java compiles source code to bytecode, bytecode will be executed by runtime environment.
- Java is **free to access** and **run on all platforms**

<p align="center">
  <img src="assets/images/java-application.png" alt="java">
  <br/>
  <i><a href=https://www.edureka.co/blog/what-is-java/>Source: What Is Java? A Beginner’s Guide to Java and Its Evolution</a></i>
</p>

## *Write once, run everywhere*

    A programmer can develop Java code on one system and can expect it to run on any other Java-enabled system without adjustment.

- In traditional programming language like C or C++, source code is converted to code suitable for particular hardware. Hence, when we try to run same code on another machine with different hardware, error will happen or we have to recompile code.
- In Java, the program is not converted directly to machine code, but to bytecode(.class file), which is interpreted by JVM. Hence, it can be run on any machine which has JVM.

<p align="center">
  <img src="assets/images/wore.png" alt="wore">
  <br/>
  <i><a href="https://www.geeksforgeeks.org/why-is-java-write-once-and-run-anywhere/">Source: Why is Java ‘write once and run anywhere’?</a></i>
</p>

## JDK, JRE and JVM
### JVM (Java Virtual Machine)

    Convert bytecodes to machine code

When you run the Java program, Java compiler first compiles your Java code to bytecode. Then, the JVM translates bytecode into native machine code (set of instructions that a computer's CPU executes directly).


<p align="center">
  <img src="assets/images/jvm.jpg" alt="jvm">
  <br/>
  <i><a href="https://www.programiz.com/java-programming/jvm-jre-jdk">Source: Java JDK, JRE and JVM</a></i>
</p>

### JRE (Java Runtime Environment)

    Provide Java class libraries

<p align="center">
  <img src="assets/images/jre.jpg" alt="jre">
  <br/>
  <i><a href="https://www.programiz.com/java-programming/jvm-jre-jdk">Source: Java JDK, JRE and JVM</a></i>
</p>

### JDK (Java Development Kit)

    Development kit required to develop applications in Java
Contains a number of development tools(compilers, JavaDoc, Java Debugger, etc..)
<p align="center">
  <img src="assets/images/jdk.jpg" alt="jdk">
  <br/>
  <i><a href="https://www.programiz.com/java-programming/jvm-jre-jdk">Source: Java JDK, JRE and JVM</a></i>
</p>

<p align="center">
  <img src="assets/images/jdkjrejvm.jpg" alt="jdk">
  <br/>
  <i><a href="https://www.programiz.com/java-programming/jvm-jre-jdk">Source: Java JDK, JRE and JVM</a></i>
</p>

## Java Compile and Run Process

<p align="center">
  <img src="assets/images/java-process.png" alt="jdk">
  <br/>
  <i><a href="https://javatutorial.net/jvm-explained">Source: JVM Explained</a></i>
</p>

**Loading**
- Compiled classes (.class) is loaded into memory
- Classes are introduced into Java environment when they are referenced by name in a class that is already running.
- Loading classes is done by class loader, once the first class is running.

**Linking**

Verifying and preparing class/interface, its direct superclass, its direct super-interfaces and its element type if needed

**Initialization**

- Executing its class/interface initialization method or calling the class's constructor
- All static variables will be assigned with original values, the static block will be executed

**Method Area**

- All class level data will be stored here (including static variables)
- Only one method area per JVM, it is a shared resource

**Heap Area**
- All objects and their variables, arrays will be stored here
- Only one heap area per JVM, and it is a shared resources

**Stack Area**

- For every thread, a separate stack will be created. For every method call, one entry will be made in the stack memory (Stack Frame)
- Local variables in stack memory
- Not a shared resources

**PC Registers**

- Each thread will have separate PC Registers for holding address of current executing
- Once the instruction is executed, PC register will be updated with next instruction

**Native Method stacks**
- Holds native method information

**Interpreter**
- Converts bytecode into machine code
- Slow when one method is called multiple times

**JIT Compiler**

Takes advantage of `Interpreter`, make sure multiple interpretation doesn't occur to same code

**Garbage Collector**

Collects and removes unreferenced objects.

**Java Native Interface**

Interacts with Native Method libraries and provides Native Libraries required for Execution Engine

**Native Method Libraries**

Collection of Native Libraries required for Execution Engine

## Java Data Types

### Primitive types

**boolean**
- Two possible values: `true` or `false`
- Default: `false`
- Declaration: `boolean flag = true;`

**byte**
- Value from: `[-127, 128]`
- It's used instead of `int` or other integer data types to save memory when it's certain that value of a variable will be within `[-128,127]`
- Default: `0`
- Declaration: `byte range = 124;`

**short**
- Value from: `[-32768, 32767]`
- It's used instead of `int` or other integer data types to save memory when it's certain that value of a variable will be within `[-32768, 32767]`
- Default: `0`
- Declaration: `short temp = -200;`

**int**
- Value from: [-2<sup>31</sup>, 2<sup>31</sup>-1]
- `unsigned 32-bit integer`: [0, 2<sup>32</sup>-1]
- Default: `0`
- Declaration: `int range = -4250000;`

**long**
- Value from: [-2<sup>63</sup>, 2<sup>63</sup>-1]
- `unsigned 64-bit integer`: [0, 2<sup>64</sup>-1]
- Default: `0`
- Declaration: `long range = -42332200000L;`

**double**
- Double-precision `64-bit floating-point`
- Should not be used for precise values such as currency
- Default: `0.0`
- Declaration: `double range = -42.3;`

**float**
- Single-precision `32-bit floating-point`
- Should not be used for precise values such as currency
- Default: `0.0`
- Declaration: `float range = -42.3f;`

**char**
- `16-bit unicode character`
- Default: `\u0000`
- Declaration: `char letter = '\u0051';`

### Non-primitives data type

- Called **referenced types** because they refer to objects
- Are created by programmer and is not defined by Java (except for `String`)
- Can be used to call methods
- Can be null
- Starts with uppercase letter
- All have same sizes

## Java is Pass-by-Value

- **Pass by Value:** The method parameter values are copied to another variable and then the copied object is passed
- **Pass by Reference:** An alias or reference to the actual parameter is passed to the method


```
public static void main( String[] args ){
    Dog dog = new Dog("Hehe");
    foo(dog);

    if (dog.getName().equals("Hehe")) { //true
        System.out.println( "Java passes by value." );

    } else if (dog.getName().equals("Hihi")) {
        System.out.println( "Java passes by reference." );
    }
}

public static void foo(Dog d) {
    d.getName().equals("Hehe"); // true
    
    d = new Dog("Haha");
    d.getName().equals("Haha"); // true

    //d.setName("Hihi");
}
```

- `dog = new Dog("Hehe")`, variable dog is not a real Dog but just reference to Dog object in heap (dog is just a pointer), Assume that this dog pointer points to offset 1000.
- When passing dog to parameter `d` in foo function, variable `d` in created but also reference `Dog("Hehe")` object (in heap memory). In this case, d is also a pointer (in offset 1000) but `dog` and `d` are different pointers in stack (together point to offset 1000). When d points to `Dog("Haha")` (assume the offset is 2000), but the dog variable in main still points to the first `Dog("Hehe")` (offset 1000)
- Assume the foo function is changed to `d.setName("Hihi")`, d will change the internal value of object `Dog("Hehe")` to `Hihi`. Although the object reference has changed its name to d but it still points to the same offset. In this case, Java will pass by value of reference (both `dog` and `d` are references, but both references pass the value, 1000)

## Exceptions

<p align="center">
  <img src="assets/images/ExceptionHierarchy.png" alt="exceptions">
  <br/>
  <i><a href="https://www.programiz.com/java-programming/exceptions">Source: Exceptions</a></i>
</p>

### Error

- Irrecoverable exceptions such as out of memory, memory leaks, stack overflow errors, library incompatibility, infinite recursion, etc.
- Beyond the control of programmer, we should not try to handle errors

### Exceptions

- Can be caught and handled by the program
- When exception happens, it creates an object (exception object). It contains information about exception such as the name, description and state of program when exception occurred

#### RuntimeException - unchecked exception

    Exception that is not checked at compile time
- Commons
  - `IllegalArgumentException`: Improper use of an API
  - `NullPointerException`: Null pointer access (missing the initialization of variable)
  - `ArrayIndexOutOfBoundsException`: Out-of-bounds array access
  - `ArithmeticException`: dividing a number by 0

#### IOException - checked exception
    Checked by compiler at compile-time and programmer is prompted to handle these exceptions
- Commons
  - `FileNotFoundException`: Try to open non-exists file
  - Try to read past the end of a file

## Abstract vs Interface

### Interface

- Not a class
- Only contains empty methods
- A blueprint for classes to implement
- A class can implement many interfaces
- Class must implement all methods in interface

### Abstract

- Same as interface but contains more
- Two types of methods:
  - abstract method - empty method
  - normal method
- A class can only extend one abstract class
- Normal method will be used for all sub class (without re-implementing)

### Comparison

- **Abstract**:
  - Cannot extend many abstract class
- **Interface**
  - When a class implements an interface, that class needs to implement all methods (some of them may not be needed)

### When to use which
- **Abstract**: use when extended class have lots of properties in common with abstract class
- **Interface**: use when we want a function be used among classes without caring what it is

## Java Collections

<p align="center">
  <img src="assets/images/Java-Collections.png" alt="collections">
  <br/>
  <i><a href="https://www.programiz.com/java-programming/collections">Source: Collections</a></i>
</p>

### List 

    An ordered collection that allows to add and remove elements like an array

<p align="center">
  <img src="assets/images/Java-list-interface.png" alt="lists">
  <br/>
  <i><a href="https://www.programiz.com/java-programming/list">Source: List</a></i>
</p>

**How to use**

In Java, we must import java.util.List package in order to use List.

```
// ArrayList implementation of List
List<String> list1 = new ArrayList<>();

// LinkedList implementation of List
List<String> list2 = new LinkedList<>();
```

### Set

    Unlike List, Set cannot contain duplicate elements

**Classes that implement Set**

<p align="center">
  <img src="assets/images/java-set-implementation.png" alt="sets">
  <br/>
  <i><a href="https://www.programiz.com/java-programming/set">Source: Set</a></i>
</p>


**How to use**

In Java, we must import java.util.Set package in order to use Set.
```
// Set implementation using HashSet
Set<String> animals = new HashSet<>();
```

### Map
    In Java, elements of Map are stored in key/value pairs. Keys are unique values associated with individual Values.

<p align="center">
  <img src="assets/images/java-map-implementation.png" alt="map">
  <br/>
  <i><a href="https://www.programiz.com/java-programming/map">Source: Map</a></i>
</p>


A map cannot contain duplicate keys. And, each key is associated with a single value.
<p align="center">
  <img src="assets/images/java-map-implementation.png" alt="map">
  <br/>
  <i><a href="https://www.programiz.com/java-programming/map">Source: Map</a></i>
</p>


**How to use**

```
// Map implementation using HashMap
Map<Key, Value> numbers = new HashMap<>();
```

## Java Generics

    Helps to create classes, interfaces, and methods that can be used with different types of objects (data). Hence, allows us to reuse our code.

### How to use
```
ArrayList<Integer> list1 = new ArrayList<>();
```
- We have used `Integer` inside the angle brackets, <>. The angle bracket, <> is known as the **type parameter** in generics.

### Creation

**Creating Generic Class**

```
class GenericsClass<T> {...}
```

**Creating Generics Methods**

```
public <T> void genericMethod(T data) {...}
```

### Bounded types

In general, the **type parameter** can accept any data types (except primitive types). However, if we want to use generics for some specific types (such as accept data of number types) only, then we can use bounded types.

```
class GenericsClass <T extends Number> {

  public void display() {
    System.out.println("This is a bounded type generics class.");
  }
}

class Main {
  public static void main(String[] args) {

    // create an object of GenericsClass
    GenericsClass<String> obj = new GenericsClass<>();
  }
}
```

- In this example, `T` can only work with data types that are children of `Number (Integer, Double, ...)`
- However, we have created an object of the generics class with String. This is why when we run the program, we will get the following error.

```
GenericsClass<String> obj = new GenericsClass<>();
                                                 ^
    reason: inference variable T has incompatible bounds
      equality constraints: String
      lower bounds: Number
  where T is a type-variable:
    T extends Number declared in class GenericsClass
```

### Advantages

- Code Reusability
- Compile-time Type Checking
- Used with Collections

## Multithreading
### Basic Multithreading

#### Parallelism

Simultaneous execution of processes on a `multiple cores per CPU` or `multiple CPUs (on a single motherboard)`

<p align="center">
  <img src="assets/images/concurrency-and-parallelism-are-different-3.jpg" alt="parallelism">
  <br/>
  <i><a href="https://luminousmen.com/post/concurrency-and-parallelism-are-different">Source: Concurrency and parallelism are two different things</a></i>
</p>

**Example**: You're a professional Java programmer.., and you enjoy listening to calm music while coding


#### Concurrency

*Parallelism* is achieved on a `single core/CPU` by using scheduling algorithms that divines CPU's tim  (time-slice). Processes *interleaved* 

<p align="center">
  <img src="assets/images/concurrency-and-parallelism-are-different-2.jpg" alt="concurrency">
  <br/>
  <i><a href="https://luminousmen.com/post/concurrency-and-parallelism-are-different">Source: Concurrency and parallelism are two different things</a></i>
</p>


**Example:** You decide to learn Java! You start watching a video tutorial, you need to pause the video, apply what has been said in code then continue watching


#### Multithreading in Java is both Concurrency and Parallelism

Depends on the machine, when the machine only has `one-core processor`, it will execute concurrently. However, the machine has `multiple cores`, it will do parallelism

#### Runnable vs Thread

**Difference**

- Runnable is **interface**
- Thread is **abstract class**

**How to**
- **Runnable**
  - Implements Runnable interface, override `run()` method
  - Create Thread object with parameter: Runnable implementation
  - Call `start()` method

- **Thread**
  - Extends Thread class, override `run()` method
  - Create Thread object
  - Call `start()` method

**Which one to use**
  - When we implement interface Runnable, we still can extend 1 more class. However, when we extend Thread class, we cannot extend any other class
  - When a class implement interface Runnable, that class has `has-a` relationship. However, class extends Thread has `is-a` relationship. 
  - Normally, `has-a` relationship is easier to reduce code dependency, to test and to maintain
  - Extends Thread meaning that we inherit all methods of Thread class and it's not necessary
  - Only extend Thread when we want to use method of Thread class (mostly Runnable)

### Advanced Multithreading
#### Thread safety
**Stateless Implementations**
- Given a specific input, it always produces the same output
- The method neither relies on external state nor maintains state at all

```
public class MathUtils {

  public static BigInteger factorial(int number) {
      BigInteger f = new BigInteger("1");
      for (int i = 2; i <= number; i++) {
          f = f.multiply(BigInteger.valueOf(i));
      }
      return f;
  }
}
```

**Immutable implementations**
- Make classes immutation for thread safety
- A class instance if immutable when its internal state can't be modified after is has been constructed
- Declaring all fields `private` or `final` and `not provide setters`

```
public class MessageService {
    
    private final String message;
 
    public MessageService(String message) {
        this.message = message;
    }
    
    // standard getter
    
}
```

**Thread-Local fields**
- Making classes fields thread-local
- Simply defining private fields in `Thread` classes

```
public class ThreadA extends Thread {
    
    private final List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5, 6);
    
    @Override
    public void run() {
        numbers.forEach(System.out::println);
    }
}

public class ThreadB extends Thread {
    
    private final List<String> letters = Arrays.asList("a", "b", "c", "d", "e", "f");
    
    @Override
    public void run() {
        letters.forEach(System.out::println);
    }
}
```

- In both implementations, the classes have their own state but it's not shared with other threads

**Synchronized Collections**
- This means that methods can be accessed by only one thread at a time, while other threads will be blocked until the method is unlocked by the first thread
- A penalty in performance, due to underlying logic of synchronized access

```
Collection<Integer> syncCollection = Collections.synchronizedCollection(new ArrayList<>());
Thread thread1 = new Thread(() -> syncCollection.addAll(Arrays.asList(1, 2, 3, 4, 5, 6)));
Thread thread2 = new Thread(() -> syncCollection.addAll(Arrays.asList(7, 8, 9, 10, 11, 12)));
thread1.start();
thread2.start();
```

**Concurrent Collections**
- Achieved thread-safety by dividing data into segments
- Much more performance than synchronized collections

```
Map<String,String> concurrentMap = new ConcurrentHashMap<>();
concurrentMap.put("1", "one");
concurrentMap.put("2", "two");
concurrentMap.put("3", "three");
```

**Atomic Objects**
- Allow us to perform atomic operations, without using `synchronization`

```
public class AtomicCounter {
    
    private final AtomicInteger counter = new AtomicInteger();
    
    public void incrementCounter() {
        counter.incrementAndGet();
    }
    
    public int getCounter() {
        return counter.get();
    }
}
```

**Synchronized methods**

Only one thread can access a synchronized method at a time while blocking access to this method from other threads

```
public synchronized void incrementCounter() {
    counter += 1;
}
```
**Synchronized Statements**

Synchronization is expensive, so with this option, we are able to only synchronize the relevant parts of a method

```
public void incrementCounter() {
    // additional unsynced operations
    synchronized(this) {
        counter += 1; 
    }
}
```

**Other Objects as a Lock**
- Uses an external entity to enforce exclusive access to the resource

```
public class ObjectLockCounter {
 
    private int counter = 0;
    private final Object lock = new Object();
    
    public void incrementCounter() {
        synchronized(lock) {
            counter += 1;
        }
    }
    
    // standard getter
}
```

**Caveats**
```
public class Class1 {
    private static final String LOCK  = "Lock";
 
    // uses the LOCK as the intrinsic lock
}
 
public class Class2 {
    private static final String LOCK  = "Lock";
 
    // uses the LOCK as the intrinsic lock
}
```
- At first glance, it seems that these two classes are using two different objects as their lock. However, because of string interning, these two “Lock” values may actually refer to the same object on the string pool. That is, the Class1 and Class2 are sharing the same lock!
- In addition to Strings, we should avoid using any cacheable or reusable objects as intrinsic locks. 

**Volatile Fields**
- Synchronized methods and blocks are handy for addressing variable visibility problems among threads. 
- Even so, the values of regular class fields might be cached by the CPU.
- Hence, consequent updates to a particular field, even if they're synchronized, might not be visible to other threads.
- With the `volatile keyword`, we instruct the JVM and the compiler to store the counter variable in the main memory.
- The use of a `volatile variable` ensures that all variables that are visible to a given thread will be read from the main memory as well.

```
public class Counter {
 
    private volatile int counter;
 
    // standard constructors / getter
    
}
```
**Reentrant Locks**
- With `intrinsic locks`, there's no underlying mechanism that checks the queued threads and gives priority access to the longest waiting threads.
- `ReentrantLock` prevents queued threads from suffering some types of resource starvation
- The ReentrantLock constructor takes an optional fairness boolean parameter. When set to true, and multiple threads are trying to acquire a lock, **the JVM will give priority to the longest waiting thread and grant access to the lock.**

```
public class ReentrantLockCounter {
 
    private int counter;
    private final ReentrantLock reLock = new ReentrantLock(true);
    
    public void incrementCounter() {
        reLock.lock();
        try {
            counter += 1;
        } finally {
            reLock.unlock();
        }
    }
    
    // standard constructors / getter
    
}
```

**Read/Write Locks**
- A ReadWriteLock lock actually uses a pair of associated locks, one for read-only operations and other for writing operations.
- It's possible to have many threads reading a resource, as long as there's no thread writing to it. Moreover, the thread writing to the resource will prevent other threads from reading it.

```
public class ReentrantReadWriteLockCounter {
    
    private int counter;
    private final ReentrantReadWriteLock rwLock = new ReentrantReadWriteLock();
    private final Lock readLock = rwLock.readLock();
    private final Lock writeLock = rwLock.writeLock();
    
    public void incrementCounter() {
        writeLock.lock();
        try {
            counter += 1;
        } finally {
            writeLock.unlock();
        }
    }
    
    public int getCounter() {
        readLock.lock();
        try {
            return counter;
        } finally {
            readLock.unlock();
        }
    }
 
   // standard constructors
   
}
```

#### Thread Pools
- In Java, threads are mapped to system-level threads which are operating system's resources. If you create threads uncontrollably, you may run out of these resources quickly.
- When you use a thread pool, you **write your concurrent code in the form of parallel tasks and submit them for execution to an instance of a thread pool.**

<p align="center">
  <img src="assets/images/2016-08-10_10-16-52-1024x572-768x429.png" alt="concurrency">
  <br/>
  <i><a href="https://www.baeldung.com/thread-pool-java-and-guava">Source: Introduction to Thread Pools in Java</a></i>
</p>

**Executors, Executor and ExecutorService**
- The Executors helper class contains several methods for the creation of pre-configured thread pool instances for you. Those classes are a good place to start with – use it if you don't need to apply any custom fine-tuning.
- The Executor and ExecutorService interfaces are used to work with different thread pool implementations in Java. Usually, you should keep your code decoupled from the actual implementation of the thread pool and use these interfaces throughout your application.

```
Executor executor = Executors.newSingleThreadExecutor();
executor.execute(() -> System.out.println("Hello World"));
```

**ThreadPoolExecutor**
- Extensible thread pool implementation with lots of parameters and hooks for fine-tuning.
- Main params:
  - **corePoolSize**: number of core threads that will be instantiated and kept in the pool.
  - **maximumPoolSize**: if all core threads are busy and the internal queue is full, then the pool is allowed to grow up to maximumPoolSize.
  - **keepAliveTime**: Interval of time for which the excessive threads are allowed to exist in the idle state

```
ThreadPoolExecutor executor = 
  (ThreadPoolExecutor) Executors.newFixedThreadPool(2);
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
 
assertEquals(2, executor.getPoolSize());
assertEquals(1, executor.getQueue().size());
```

## Java 8 LTS

### Lambda Expressions

#### Functional Interface

- If a Java interface contains one and only one abstract method then it is termed as functional interface. 

- **Example**: the Runnable interface from package java.lang; is a functional interface because it constitutes only one method i.e. run().

```
import java.lang.FunctionalInterface;
@FunctionalInterface
public interface MyInterface{
    // the single abstract method
    double getValue();
}
```
- The annotation `@FunctionalInterface` forces Java compiler to indicate that interface is a functional interface

In Java 7, functional interfaces were considered as **Single Abstract Methods (SAM)**

In Java 8 extended the power of SAM, there should be no need to define the name of that method when passing it as an argument. Lambda expression allows us to do exactly that.

#### Definition

- An anonymous or unnamed method, it doesn't execute on its own
- It's used to implement a method defined by a functional interface

#### Usage
```
(parameter list) -> lambda body
```

```
import java.lang.FunctionalInterface;

// this is functional interface
@FunctionalInterface
interface MyInterface{

    // abstract method
    double getPiValue();
}

public class Main {

    public static void main( String[] args ) {

    // declare a reference to MyInterface
    MyInterface ref;
    
    // lambda expression
    ref = () -> 3.1415;
    
    System.out.println("Value of Pi = " + ref.getPiValue());
    } 
}
```

#### Types
**A body with a single expression**

```
() -> System.out.println("Lambdas are great");
(n) -> (n%2)==0
```

**A body consists of a block of code**
```
() -> {
    double pi = 3.1415;
    return pi;
};
```

### Default methods

- Before Java 8, interfaces could have only abstract methods. The implementation of these methods has to be provided in a separate class. So, if a new method is to be added in an interface, then its implementation code has to be provided in the class implementing the same interface. 
- To overcome this issue, Java 8 has introduced the concept of default methods which allow the interfaces to have methods with implementation without affecting the classes that implement the interface.

```

// A simple program to Test Interface default 
// methods in java 
interface TestInterface 
{ 
    // abstract method 
    public void square(int a); 
  
    // default method 
    default void show() 
    { 
      System.out.println("Default Method Executed"); 
    } 
} 
  
class TestClass implements TestInterface 
{ 
    // implementation of square abstract method 
    public void square(int a) 
    { 
        System.out.println(a*a); 
    } 
  
    public static void main(String args[]) 
    { 
        TestClass d = new TestClass(); 
        d.square(4); 
  
        // default method executed 
        d.show(); 
    } 
} 
```

### Stream

#### Definition

- A stream is a sequence of objects that supports various methods which can be pipelined to produce the desired result.
  
#### Operations
**Intermediate Operations**
- **map:** return a stream consisting of the results of applying given function to elements of stream

```
List number = Arrays.asList(2,3,4,5);
List square = number.stream().map(x->x*x).collect(Collectors.toList());
```
- **filter:** Select elements based on conditions

```
List names = Arrays.asList("Reflection","Collection","Stream");
List result = names.stream().filter(s->s.startsWith("S")).collect(Collectors.toList());
```

- **sorted:** Sort the stream

```
List names = Arrays.asList("Reflection","Collection","Stream");
List result = names.stream().sorted().collect(Collectors.toList());
```

**Terminal Operations**
- **collect:** return result of intermediate operations

```
List number = Arrays.asList(2,3,4,5,3);
Set square = number.stream().map(x->x*x).collect(Collectors.toSet());
```

- **forEach:** used to iterate through every element of the stream

```
List number = Arrays.asList(2,3,4,5);
number.stream().map(x->x*x).forEach(y->System.out.println(y));
```

- **reduce:** used to reduce the elements of a stream to a single value

```
List number = Arrays.asList(2,3,4,5);
int even = number.stream().filter(x->x%2==0).reduce(0,(ans,i)-> ans+i);
```

### Optional class

- `NullPointerException` can crash your code and it's very hard to avoid it without using too many null checks
- By using `Optional`, we can specify alternate values to return or alternate code to run

```
// Java program with Optional Class 
import java.util.Optional;   
public class OptionalDemo{   
    public static void main(String[] args) {   
        String[] words = new String[10];   
        Optional<String> checkNull =  
                      Optional.ofNullable(words[5]);   
        if (checkNull.isPresent()) {   
            String word = words[5].toLowerCase();   
            System.out.print(word);   
        } else  
            System.out.println("word is null");   
    }   
}   
```

### New DateTime API
#### LocalDate
- Represents a date in ISO format (yyyy-MM-dd) without time.
- Used to store dates like birthdays and paydays.

```
// Instance of current date
LocalDate localDate = LocalDate.now();

// Instance of specific day, month and year
LocalDate.of(2015, 02, 20); 
LocalDate.parse("2015-02-20");

// Add one day
LocalDate tomorrow = LocalDate.now().plusDays(1);

// Subtract one month
LocalDate previousMonthSameDay = LocalDate.now().minus(1, ChronoUnit.MONTHS);

// Get date of week, month
DayOfWeek sunday = LocalDate.parse("2016-06-12").getDayOfWeek();
int twelve = LocalDate.parse("2016-06-12").getDayOfMonth();

// Test leap year
boolean leapYear = LocalDate.now().isLeapYear();

// Check before after
boolean notBefore = LocalDate.parse("2016-06-12")
  .isBefore(LocalDate.parse("2016-06-11"));
 
boolean isAfter = LocalDate.parse("2016-06-12")
  .isAfter(LocalDate.parse("2016-06-11"));

```

#### LocalTime

Represents **time without a date**

```
// Instance of current time
LocalTime now = LocalTime.now();

// Instance of specific time

LocalTime sixThirty = LocalTime.parse("06:30");
LocalTime sixThirty = LocalTime.of(6, 30);

// Add time
LocalTime sevenThirty = LocalTime.parse("06:30").plus(1, ChronoUnit.HOURS);

// Get time
int six = LocalTime.parse("06:30").getHour();

// Check before & after
boolean isbefore = LocalTime.parse("06:30").isBefore(LocalTime.parse("07:30"));

// MAX, MIN time
LocalTime maxTime = LocalTime.MAX

```

#### LocalDateTime
Represents **a combination of date and time**

```
// Instance of current datetime
LocalDateTime.now();

// Instance of specific datetime
LocalDateTime.of(2015, Month.FEBRUARY, 20, 06, 30);
LocalDateTime.parse("2015-02-20T06:30:00");

// Add datetime
localDateTime.plusDays(1);
localDateTime.minusHours(2);

// Get datetime
localDateTime.getMonth();
```

#### ZonedDateTime

When we need to deal with time zone specific date and time.

```
\\ Get ZoneID
ZoneId zoneId = ZoneId.of("Europe/Paris");

\\ Get all zone ids
Set<String> allZoneIds = ZoneId.getAvailableZoneIds();

\\ Convert LocalDateTime to a specific zone
ZonedDateTime zonedDateTime = ZonedDateTime.of(localDateTime, zoneId);

\\ Parse to specific date item
ZonedDateTime.parse("2015-05-03T10:15:30+01:00[Europe/Paris]");

```

#### Period
Quantity of time in terms of years, months and days

```
\\ Plus date
LocalDate finalDate = initialDate.plus(Period.ofDays(5));

\\ Date difference
int five = Period.between(initialDate, finalDate).getDays();

```

#### Duration
Quantity of time in terms of seconds and nano seconds

```
LocalTime initialTime = LocalTime.of(6, 30, 0);
 
LocalTime finalTime = initialTime.plus(Duration.ofSeconds(30));

long thirty = Duration.between(initialTime, finalTime).getSeconds();

```

#### Compatibility with Date and Calendar

`toInstant()` method helps convert existing Date and Calendar instance to new Date Time API
```
LocalDateTime.ofInstant(date.toInstant(), ZoneId.systemDefault());
LocalDateTime.ofInstant(calendar.toInstant(), ZoneId.systemDefault());

```

#### Formatting
```
localDateTime.format(DateTimeFormatter.ofPattern("yyyy/MM/dd"));

localDateTime
  .format(DateTimeFormatter.ofLocalizedDateTime(FormatStyle.MEDIUM))
  .withLocale(Locale.UK);
```

## Maven

### Definition

- A powerful project management tool that is based on POM (project object model)
- Used for projects build, dependency and documentation

<p align="center">
  <img src="assets/images/How-Maven-Works.jpg" alt="maven">
  <br/>
  <i><a href="https://www.geeksforgeeks.org/introduction-apache-maven-build-automation-tool-java-projects/">Source: Introduction to Apache Maven | A build automation tool for Java projects</a></i>
</p>

### Commands
- **mvn clean** cleans the maven project by deleting the target directory
- **mvn install** builds the maven project and installs the project files to local repo
- **mvn package** build the maven project and packages into JAR, WAR, etc
- **mvn test** run test cases of project

## Unit Test

- Create ideal environment to test any code block and detect error exactly
- Detect inefficient or time-out code 
- Detect system design problem
- Create safe barrier between code block

# Models & Principles

## Client-server model

### MVC vs MVVM

| MVC                                               | MVVM                                                       |
|---------------------------------------------------|------------------------------------------------------------|
| Controller is the entry point to the Application  | The view is the entry point to the Application             |
| One to many relationships between Controller&View | One to many relationships between View&View-Model          |
| View doesn't have reference to the Controller     | View have references to View-Model                         |
| Old model                                         | Relatively new model                                       |
| Difficult to read, change, unit test and reuse    | Debugging is complicated when having complex data bindings |
| Model can be tested separately from user          | Easy for separate unit test and code is event-driven       |

### HTTP, Websocket, gRPC

- **HTTP** - A protocal allows the fetching of resources, such as HTML docs.
- **Websocket** - A technology makes it possible to open a two-way interactive communication session between user's browser and server. With this API, you can send messages to a server and receive responses without having to poll the server for reply
- **gRPC** - A framework helps connecting services in system, support **load-balancing, tracing, health checking and authentication**, etc. It uses Protocol Buffer to transfer data instead of JSON/XML so that its speed is much better. It's designed to replace REST API, instead of focusing in resource, it focuses on action.

### SSL/TLS

<p align="center">
  <img src="assets/images/SSL_TLS.png" alt="SSLTLS">
  <br/>
  <i><a href="https://www.hostinger.vn/huong-dan/https-tls-ssl-la-gi/">Source: HTTPS-TLS-SSL?</a></i>
</p>

- **SSL (Secure Sockets Layer)** - a type of encrypting information between website and browser. It's outdated
- **TLS (Transport Layer Security)** - just like SSL, but modern

- SSL/TLS uses public and private key, and they are unique for every request/response. 
- This helps gain certificate for your website, avoid replicating. SSL/TLS helps build reliability between customers and website. Finally, this is a standard rule in industry

### RESTful API

<p align="center">
  <img src="assets/images/restful-api.jpg" alt="restfullapi">
  <br/>
  <i><a href="https://topdev.vn/blog/restful-api-la-gi/">Source: What is RESTful API</a></i>
</p>

- **API** - a set of rules telling how an app can interact with other components. JSON and XML are popular return types
- **REST** - Instead of using URL for processing, REST sends a HTTP request such as GET, POST, DELETE to url for data processing
- **RESTful API** - a standard for designing API for web application for managing resource (docs, sound, video, etc)

## Principles

### SOLID

- **S - Single-responsibility principle** - A class should have one and only one job

**Example**

For example, we have a simple Book class

```
public class Book {
 
    private String name;
    private String author;
    private String text;

    // methods that directly relate to the book properties
    public String replaceWordInText(String word){
        return text.replaceAll(word, text);
    }
 
    public boolean isWordInText(String word){
        return text.contains(word);
    }
}
```

And, we want to test our fields by adding a method that prints information to Book class. However, this violates S principle because logging is the job of other class

```
public class BookPrinter {
 
    // methods for outputting text
    void printTextToConsole(String text){
        //our code for formatting and printing the text
    }
 
    void printTextToAnotherMedium(String text){
        // code for writing to any other location..
    }
}
```


- **Open-closed principle** - Objects or entities should be open for extension, but closed for modification

**Example**
Imagine we have a Guitar class

```
public class Guitar {
 
    private String make;
    private String model;
    private int volume;
 
    //Constructors, getters & setters
}
```

- We launch the application, and everyone loves it. However, after a few months, we decide the Guitar is a little bit boring and could do with an awesome flame pattern to make it look a bit more ‘rock and roll'.
- At this point, it might be tempting to just open up the Guitar class and add a flame pattern – but who knows what errors that might throw up in our application. 
- To stick to O principle, we extend our Guitar class

```
public class SuperCoolGuitarWithFlames extends Guitar {
 
    private String flameColor;
 
    //constructor, getters + setters
}
```

- **Liskov substitution principle** - If class A is a subtype of class B, then we should be able to replace B with A without disrupting the behavior of our program.

**Example**
Imagine we have a Car interface, that all cars can turn on engine, accelerate forward

```
public interface Car {
 
    void turnOnEngine();
    void accelerate();
}
```
And it's implementation

```
public class MotorCar implements Car {
 
    private Engine engine;
 
    //Constructors, getters + setters
 
    public void turnOnEngine() {
        //turn on the engine!
        engine.on();
    }
 
    public void accelerate() {
        //move forward!
        engine.powerOn(1000);
    }
}
```

However, when we have electric cars, an error happens because we've changed behavior of our Car

```
public class ElectricCar implements Car {
 
    public void turnOnEngine() {
        throw new AssertionError("I don't have an engine!");
    }
 
    public void accelerate() {
        //this acceleration is crazy!
    }
}
```

- **Interface segregation principle** - Larger interfaces should be split into smaller ones. By doing so, we can ensure that implementing classes only need to be concerned about the methods that are of interest to them.

**Example**
```
public interface BearKeeper {
    void washTheBear();
    void feedTheBear();
    void petTheBear();
}
```
- As avid zookeepers, we're more than happy to wash and feed our beloved bears. However, we're all too aware of the dangers of petting them. Unfortunately, our interface is rather large, and we have no choice than to implement the code to pet the bear.
- Let's fix this by splitting our large interface into 3 separate ones:
```
public interface BearCleaner {
    void washTheBear();
}
 
public interface BearFeeder {
    void feedTheBear();
}
 
public interface BearPetter {
    void petTheBear();
}
```
- Now, thanks to interface segregation, we're free to implement only the methods that matter to us:

```
public class BearCarer implements BearCleaner, BearFeeder {
 
    public void washTheBear() {
        //I think we missed a spot...
    }
 
    public void feedTheBear() {
        //Tuna Tuesdays...
    }
}
```

- And finally, we can leave the dangerous stuff to the crazy people:

```
public class CrazyPerson implements BearPetter {
 
    public void petTheBear() {
        //Good luck with that!
    }
}
```

- **Dependency Inversion principle** - Instead of high-level modules depending on low-level modules, both will depend on abstractions.

**Example**

```
	public class Windows98Machine {
 
    private final StandardKeyboard keyboard;
    private final Monitor monitor;
 
    public Windows98Machine() {
        monitor = new Monitor();
        keyboard = new StandardKeyboard();
    }
 
}
```

- By declaring the StandardKeyboard and Monitor with the new keyword, we've tightly coupled these 3 classes together.

- Not only does this make our Windows98Computer hard to test, but we've also lost the ability to switch out our StandardKeyboard class with a different one should the need arise. And we're stuck with our Monitor class, too.

- Let's decouple our machine from the StandardKeyboard by adding a more general Keyboard interface and using this in our class:

```
public interface Keyboard { }
public class Windows98Machine{
 
    private final Keyboard keyboard;
    private final Monitor monitor;
 
    public Windows98Machine(Keyboard keyboard, Monitor monitor) {
        this.keyboard = keyboard;
        this.monitor = monitor;
    }
}
```

- Let's also modify our StandardKeyboard class to implement the Keyboard interface so that it's suitable for injecting into the Windows98Machine class:

```
public class StandardKeyboard implements Keyboard { }
```

### DRY and KISS
**DRY**
- Stand for "Don't Repeat Yourself", a principle aims at reducing repetition of information
- To achieve DRY, divide your system into pieces, into smaller reusable units and use that code by calling it where you want.
- Less code is good, it saves time and effort, easy to maintain and reduces chances of bugs
- **Helper functions in libraries** is a good example of DRY principle

**KISS**
- Stand for "Keep It Simple, Stupid"
- Keep code simple and clear, every method should never be more than 40-50 lines
- Easy to understand and modify