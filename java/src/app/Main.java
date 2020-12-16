package app;

import patterns.abstractfactory.*;
import patterns.factory.*;
import patterns.singleton.*;

public class Main {
    public static void main(String[] args) {
        // Factory
        System.out.println("[Factory Pattern]");
        PieFactory factory1 = new ApplePieFactory();
        Pie pie1 = factory1.makePie();
        System.out.println(pie1.getFlavor());
        PieFactory factory2 = new StrawberryPieFactory();
        Pie pie2 = factory2.makePie();
        System.out.println(pie2.getFlavor());

        // Abstract Factory
        System.out.println("[Abstract Factory Pattern]");
        FoodFactory lemonFactory = new LemonFoodFactory();
        Jelly lemonJelly = lemonFactory.makeJelly();
        Juice lemonJuice = lemonFactory.makeJuice();
        FoodFactory mangoFactory = new MangoFoodFactory();
        Jelly mangoJelly = mangoFactory.makeJelly();
        Juice mangoJuice = mangoFactory.makeJuice();
        System.out.format("%s, %s\n", lemonJelly.getName(), lemonJuice.getName());
        System.out.format("%s, %s\n", mangoJelly.getName(), mangoJuice.getName());

        // Singleton
        System.out.println("[Singleton Pattern]");
        Singleton1 singleton1 = Singleton1.getInstance();
        singleton1.print("Hello Singleton1!");
        Singleton2 singleton2 = Singleton2.getInstance();
        singleton2.print("Hello Singleton2!");
    }
}
