package patterns.factory;

public class ApplePieFactory extends PieFactory {
    @Override
    public Pie makePie() {
        return new ApplePie();
    }
}
