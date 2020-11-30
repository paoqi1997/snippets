import patterns.singleton.*;

public class Main {
    public static void main(String[] args) {
        // Singleton
        Singleton1 singleton1 = Singleton1.getInstance();
        singleton1.print("Hello Singleton1!");
        Singleton2 singleton2 = Singleton2.getInstance();
        singleton2.print("Hello Singleton2!");
    }
}
