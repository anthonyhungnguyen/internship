package com.company.vng;

import java.util.*;

public class MyList<T> implements List<T> {
    private final int DEFAULT_CAPACITY = 10;
    private Object[] data;
    private int size;

    public MyList() {
        data = new Object[DEFAULT_CAPACITY];
    }

    @Override
    public int size() {
        return size;
    }

    @Override
    public boolean isEmpty() {
        return size == 0;
    }

    @Override
    public int indexOf(Object o) {
        for (int i = 0; i < size; i++) {
            if (data[i].equals(o)) {
                return i;
            }
        }
        return -1;
    }

    @Override
    public boolean contains(Object o) {
        return indexOf(o) >= 0;
    }

    @Override
    public boolean add(T t) {
        if (size == data.length - 1) {
            increaseSize();
        }
        data[size++] = t;
        return true;
    }

    @Override
    public T remove(int index) {
        rangeCheck(index);
        T oldValue = (T) data[index];
        System.arraycopy(data, index + 1, data, index, size - index - 1);
        data[--size] = null;
        return oldValue;
    }

    @Override
    public boolean remove(Object o) {
        int removeIndex = indexOf(o);
        if (removeIndex != -1) {
            System.arraycopy(data, removeIndex + 1, data, removeIndex, size - removeIndex - 1);
            data[--size] = null;
            return true;
        }
        return false;
    }

    @Override
    public boolean containsAll(Collection<?> c) {
        int cSize = c.size();
        for (int i = 0; i < cSize; i++) {
            if(!contains(data[i])) {
                return false;
            }
        }
        return true;
    }

    @Override
    public boolean addAll(Collection<? extends T> c) { ;
        Object[] tempC = c.toArray();
        int cLength = tempC.length;
        while (cLength + size >= data.length) {
            increaseSize();
        }
        System.arraycopy(tempC, 0, data, size, cLength);
        size += cLength;
        return cLength != 0;
    }

    @Override
    public boolean addAll(int index, Collection<? extends T> c) {
        Object[] tempC = c.toArray();
        int cLength = tempC.length;
        while (cLength + size >= data.length) {
            increaseSize();
        }
        System.arraycopy(data, index, data, index + cLength, size - index);
        System.arraycopy(tempC, 0, data, index, cLength);
        size += cLength;
        return cLength != 0;
    }

    @Override
    public boolean removeAll(Collection<?> c) {
        int cLength = c.size();
        if (cLength != 0) {
            for (int i = 0; i < cLength; i++) {
                while(c.contains(data[i])) {
                    remove(data[i]);
                }
            }
            return true;
        }
        return false;
    }

    @Override
    public boolean retainAll(Collection<?> c) {
        if(c.size() != 0) {
            for(int i = 0; i < size(); i++) {
                while(!c.contains(data[i])) {
                    remove(data[i]);
                }
            }
            return true;
        }
        return false;
    }

    @Override
    public void clear() {
        for (int i = 0; i < size; i ++) {
            data[i] = null;
        }
        size = 0;
    }

    @Override
    public T get(int index) {
        rangeCheck(index);
        return (T) data[index];
    }

    @Override
    public T set(int index, T element) {
        rangeCheck(index);
        T oldValue = (T) data[index];
        data[index] = element;
        return oldValue;
    }

    @Override
    public void add(int index, T element) {
        rangeCheckAdd(index);
        System.arraycopy(data, index, data, index + 1, size-index);
        data[index] = element;
        size++;
    }

    @Override
    public int lastIndexOf(Object o) {
        return 0;
    }

    public void increaseSize() {
        data = Arrays.copyOf(data, data.length  * 2);
    }

    public void rangeCheck(int index) {
        if (index < 0 || index >= size) {
            throw new IndexOutOfBoundsException("Index: " + index);
        }
    }

    public void rangeCheckAdd(int index) {
        if (index < 0 || index > size) {
            throw new IndexOutOfBoundsException("index: " + index);
        }
    }

    @Override
    public List<T> subList(int fromIndex, int toIndex) {
        return null;
    }

    @Override
    public Object[] toArray() {
        return Arrays.copyOf(data, size);
    }

    @Override
    public String toString() {
        String toPrint = "";
        for(int i = 0; i < size; i++) {
            toPrint += data[i] + " ";
        }
        return toPrint;
    }

    @Override
    public Iterator<T> iterator() {
        return null;
    }

    @Override
    public <T1> T1[] toArray(T1[] a) {
        return null;
    }

    @Override
    public ListIterator<T> listIterator() {
        return null;
    }

    @Override
    public ListIterator<T> listIterator(int index) {
        return null;
    }
}
