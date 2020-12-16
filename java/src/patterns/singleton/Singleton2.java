package patterns.singleton;

public class Singleton2 {
    private static Singleton2 instance = new Singleton2();

    private Singleton2() {}

    public static Singleton2 getInstance() {
        return instance;
    }

    public void intro() {
        System.out.format("I am %s.\n", Singleton2.class.getSimpleName());
    }
}
