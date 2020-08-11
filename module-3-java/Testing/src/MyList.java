//import java.util.*;
//
//public class MyList<T> implements List<T> {
//
//    private int index;
//    private int DEFAULT_CAPACITY = 10;
//    private Object[] data;
//
//    public MyList() {
//        data = new Object[DEFAULT_CAPACITY];
//        index = -1;
//    }
//
//    @Override
//    public int size() {
//        return index;
//    }
//
//    @Override
//    public boolean isEmpty() {
//        return index == -1 ? true:false;
//    }
//
//    @Override
//    public boolean contains(Object o) {
//        for (T a: data) {
//            if (a.equals((T) o)) {
//                return true;
//            }
//        }
//        return false;
//    }
//
//    private void increaseSize() {
//        data = Arrays.copyOf(data, data.length * 2);
//    }
//
//    @Override
//    public boolean add(T o) {
//       if (index == data.length - 1) {
//           increaseSize();
//       }
//       data[++index] = (T) o;
//       return true;
//    }
//
//    @Override
//    public T get(int index) {
//        if (this.index < index) {
//            return data[index];
//        } else {
//            throw new ArrayIndexOutOfBoundsException("Index: " + index);
//        }
//    }
//
//    @Override
//    public Object set(int index, Object element) {
//        return null;
//    }
//
//    public void printAll() {
//        for(int i = 0; i <= index; i++) {
//            System.out.println(data[i] + " ");
//        }
//    }
//
//    @Override
//    public int indexOf(Object o) {
//        for (int i = 0; i <= index; i++) {
//            if (data[i].equals((T) o)) {
//                return i;
//            }
//        }
//        return -1;
//    }
//
//
//    @Override
//    public boolean remove(Object o) {
//        int indexOfObject = this.indexOf(o);
//        if (indexOfObject != -1) {
//            for (int j = indexOfObject; j <= index; j++) {
//                data[j] = data[j + 1];
//            }
//            index--;
//            return true;
//        }
//        return false;
//    }
//
//    @Override
//    public T remove(int index) {
//        if (this.index < index) {
//            T toReturn = data[index];
//            for (int j = index; j <= this.index; j++) {
//                data[j] = data[j+1];
//            }
//            this.index--;
//            return toReturn;
//        }
//        else {
//            throw new ArrayIndexOutOfBoundsException("Index: " + index);
//        }
//    }
//
//    @Override
//    public boolean addAll(Collection c) {
////        (T)
//        return false;
//    }
//
//    @Override
//    public boolean addAll(int index, Collection c) {
//        return false;
//    }
//
//    @Override
//    public void clear() {
//
//    }
//
//    @Override
//    public void add(int index, Object element) {
//
//    }
//
//    @Override
//    public int lastIndexOf(Object o) {
//        return 0;
//    }
//
//    @Override
//    public ListIterator listIterator() {
//        return null;
//    }
//
//    @Override
//    public ListIterator listIterator(int index) {
//        return null;
//    }
//
//    @Override
//    public List subList(int fromIndex, int toIndex) {
//        return null;
//    }
//
//    @Override
//    public boolean retainAll(Collection c) {
//        return false;
//    }
//
//    @Override
//    public boolean removeAll(Collection c) {
//        return false;
//    }
//
//    @Override
//    public boolean containsAll(Collection c) {
//        return false;
//    }
//
//    @Override
//    public Object[] toArray(Object[] a) {
//        return new Object[0];
//    }
//
//    @Override
//    public Iterator iterator() {
//        return null;
//    }
//
//    @Override
//    public Object[] toArray() {
//        return new Object[0];
//    }
//}
