package patterns.abstractfactory;

public class LemonFoodFactory extends FoodFactory {
    @Override
    public Jelly makeJelly() {
        return new LemonJelly();
    }
    @Override
    public Juice makeJuice() {
        return new LemonJuice();
    }
}
