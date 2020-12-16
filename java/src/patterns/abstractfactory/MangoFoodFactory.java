package patterns.abstractfactory;

public class MangoFoodFactory extends FoodFactory {
    @Override
    public Jelly makeJelly() {
        return new MangoJelly();
    }
    @Override
    public Juice makeJuice() {
        return new MangoJuice();
    }
}
