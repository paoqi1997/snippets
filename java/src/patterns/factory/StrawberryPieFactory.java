package patterns.factory;

public class StrawberryPieFactory extends PieFactory {
    @Override
    public Pie makePie() {
        return new StrawberryPie();
    }
}
