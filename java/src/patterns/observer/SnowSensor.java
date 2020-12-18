package patterns.observer;

public class SnowSensor implements WeatherSensor {
    @Override
    public void onActivate() {
        System.out.println("[SnowSensor] It is snowing.");
    }
}
