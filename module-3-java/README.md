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
    - [Comparision](#comparision)
    - [When to use which](#when-to-use-which)
  - [Java Collections](#java-collections)
    - [List](#list)
    - [Set](#set)
    - [Map](#map)
  - [Java Generics](#java-generics)
    - [How to use](#how-to-use)
    - [Creating Generic Class](#creating-generic-class)
    - [Creating Generics Methods](#creating-generics-methods)
    - [Bounded types](#bounded-types)
    - [Advantages](#advantages)
  - [Multithreading](#multithreading)
    - [Basic Multithreading](#basic-multithreading)

# Java Programming Language

## What is Java?
- A object oriented programming language (OOP) based on class.
- Instead of compiling source code to machine code when running, Java compiles source code to bytecode, bytecode will be executed by runtime environment.
- Java is **free to access** and **run on all platforms**
- Java is highly popular and has many applications in many fields:
  - **Banking**: To deal with transaction management.
  - **Retail**: Billing applications that you see in a store/restaurant are completely written in Java.
  - **Information Technology**: Java is designed to solve implementation dependencies.
  - **Android**: Applications are either written in Java or use Java API.
  - **Financial services**: It is used in server-side applications.
  - **Stock market**: To write algorithms as to which company they should invest in.  
  - **Big Data**: Hadoop MapReduce framework is written using Java.

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

A superset of JVM

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

Verifying and preparing class/interface, its direct superclass, its direct superinterfaces and its element type if needed

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

- For every thread, a seperate stack will be created. For every method call, one entry will be made in the stack memory (Stack Frame)
- Local variables in stack memory
- Not a shared resources

**PC Registers**

- Each thread will have seperate PC Registers for holding address of current executing
- Once the instruction is executed, PC register will be updated with next instruction

**Native Method stacks**
- Holds native method information

**Interpreter**
- Converts bytecodes into machine code
- Slow when one method is called multiple times

**JIT Compiler**

Takes advantage of `Interpreter`, make sure multiple interpreation doesn't occur to same code

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
- Value from: [-2<sup>63</sup>, 2<ssup>63</ssup>-1]
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

To test whether Java (or anything language) if it's passed by value, we use swap method
```
public static void swap(Object o1, Object o2){ //o1=50, o2=100
	Object temp = o1; //temp=50, o1=50, o2=100
	o1=o2; //temp=50, o1=100, o2=100
	o2=temp; //temp=50, o1=100, o2=50
} //method terminated
```

Assume that we have 2 objects, o1 and o2 with address 50 and 100 respectively. After swap terminated, we noticed changing values of o1 and o2 but they are copies of two real objects. Hence, there is actually no change in the values of 2 objects.

## Exceptions

<p align="center">
  <img src="assets/images/ExceptionHierarchy.png" alt="exceptions">
  <br/>
  <i><a href="https://www.programiz.com/java-programming/exceptions">Source: Exceptions</a></i>
</p>

### Error

- Irrecoverable exceptions such as out of memoery, memory leaks, stack overflow errors, library incompartibility, infinite recursion, etc.
- Beyond the control of programmer, we should not try to handle errors

### Exceptions

- Can be caught and handled by the program
- When exception happens, it creates an object (exception object). It contains information about exeption such as the name, description and state of program when exception occurred

### RuntimeException - unchecked exception

    Exception that is not checked at compile time
- Commons
  - `IllegalArgumentException`: Improper use of an API
  - `NullPointerException`: Null pointer access (missing the initialization of vairable)
  - `ArrayIndexOutOfBoundsException`: Out-of-bounds array access
  - `ArithmeticException`: dividing a number by 0

### IOException - checked exception
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

- Same same as interface but contains more
- Two types of methods:
  - abstract method - empty method
  - normal method
- A class can only extend one abstract class
- Normal method will be used for all sub class (without reimplementing)

### Comparision

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

- **ArrayList**: allows us to create resizable-arrays.
- **LinkedList**: provides the functionality of the linked list data structure.
- **Vector**: provides the functionality of the linked list data structure.
- **Stack**: provides the functionality of the linked list data structure.

**How to use**

In Java, we must import java.util.List package in order to use List.

```
// ArrayList implementation of List
List<String> list1 = new ArrayList<>();

// LinkedList implementation of List
List<String> list2 = new LinkedList<>();
```

**Methods**

- `add()` - adds an element to a list
- `addAll()` - adds all elements of one list to another
- `get()` - helps to randomly access elements from lists
- `iterator()` - returns iterator object that can be used to sequentially access elements of lists
- `set()` - changes elements of lists
remove() - removes an element from the list
- `removeAll()` - removes all the elements from the list
- `clear()` - removes all the elements from the list (more efficient than removeAll())
- `size()` - returns the length of lists
- `toArray()` - converts a list into an array
- `contains()` - returns true if a list contains specified element

### Set

**Classes that implement Set**

<p align="center">
  <img src="assets/images/java-set-implementation.png" alt="sets">
  <br/>
  <i><a href="https://www.programiz.com/java-programming/set">Source: Set</a></i>
</p>

- **HashSet**: provices the functionalities for hash table data structure
- **LinkedHashSet**: provides functionalities of both the hashtable and the linked list data structure
- **EnumSet**: provides a set implementation of elements of a single enum.
- **TreeSet**: provides the functionality of a tree data structure.

**How to use**

In Java, we must import java.util.Set package in order to use Set.
```
// Set implementation using HashSet
Set<String> animals = new HashSet<>();
```

**Methods**

- `add()` - adds the specified element to the set
- `addAll()` - adds all the elements of the specified collection to the set
iterator() - returns an iterator that can be used to access elements of the set sequentially
- `remove()` - removes the specified element from the set
- `removeAll()` - removes all the elements from the set that is present in another specified set
- `retainAll()` - retains all the elements in the set that are also present in another specified set
- `clear()` - removes all the elements from the set
- `size()` - returns the length (number of elements) of the set
- `toArray()` - returns an array containing all the elements of the set
- `contains()` - returns true if the set contains the specified element
- `containsAll()` - returns true if the set contains all the elements of the specified collection
- `hashCode()` - returns a hash code value (address of the element in the set)

**Operations**

- `Union` - to get the union of two sets x and y, we can use `x.addAll(y)`
- `Intersection` - to get the intersection of two sets x and y, we can use `x.retainAll(y)`
- `Subset` - to check if x is a subset of y, we can use `y.containsAll(x)`

### Map
    In Java, elements of Map are stored in key/value pairs. Keys are unique values associated with individual Values.

- A map cannot contain duplicate keys. And, each key is associated with a single value.

<p align="center">
  <img src="assets/images/Map.png" alt="map">
  <br/>
  <i><a href="https://www.programiz.com/java-programming/map">Source: Map</a></i>
</p>

<p align="center">
  <img src="assets/images/java-map-implementation.png" alt="map">
  <br/>
  <i><a href="https://www.programiz.com/java-programming/map">Source: Map</a></i>
</p>

- **HashMap**: provides the hash table implementation of the Map interface.
- **EnumMap**: provides a map implementation for elements of an enum.
- **LinkedHashMap**: provides the hash table and linked list implementation of the Map interface.
- **WeakHashMap**: provides the feature of the hash table data structure..
- **TreeMap**: provides the tree data structure implementation.

**How to use**

```
// Map implementation using HashMap
Map<Key, Value> numbers = new HashMap<>();
```

**Methods**

- `put(K, V)` - Inserts the association of a key K and a value V into the map. If the key is already present, the new value replaces the old value.
- `putAll()` - Inserts all the entries from the specified map to this map.
- `putIfAbsent(K, V)` - Inserts the association if the key K is not already associated with the value V.
- `get(K)` - Returns the value associated with the specified key K. If the key is not found, it returns null.
- `getOrDefault(K, defaultValue)` - Returns the value associated with the specified key K. If the key is not found, it returns the defaultValue.
- `containsKey(K)` - Checks if the specified key K is present in the map or not.
- `containsValue(V)` - Checks if the specified value V is present in the map or not.
- `replace(K, V)` - Replace the value of the key K with the new specified value V.
- `replace(K, oldValue, newValue)` - Replaces the value of the key K with the new value newValue only if the key K is associated with the value oldValue.
- `remove(K)` - Removes the entry from the map represented by the key K.
- `remove(K, V)` - Removes the entry from the map that has key K associated with value V.
- `keySet()` - Returns a set of all the keys present in a map.
- `values()` - Returns a set of all the values present in a map.
- `entrySet()` - Returns a set of all the key/value mapping present in a map.

## Java Generics

    Helps to create classes, interfaces, and methods that can be used with different types of objects (data). Hence, allows us to reuse our code.

### How to use
```
ArrayList<Integer> list1 = new ArrayList<>();
```
- We have used `Integer` inside the angle brackets, <>. The angle bracket, <> is known as the **type parameter** in generics.

### Creating Generic Class

```
class GenericsClass<T> {...}
```

### Creating Generics Methods

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

- **Code Reusability**
- **Compile-time Type Checking**
- **Used with Collections**

## Multithreading
### Basic Multithreading
