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