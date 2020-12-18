package patterns.observer;

public class RainSensor implements WeatherSensor {
    @Override
    public void onActivate() {
        System.out.println("[RainSensor] It is raining.");
    }
}
