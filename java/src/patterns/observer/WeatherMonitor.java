package patterns.observer;

import java.util.HashMap;
import java.util.Map;

public class WeatherMonitor {
    private Map<String, WeatherSensor> sensors = new HashMap<String, WeatherSensor>();

    public void subscribe(String weatherType, WeatherSensor sensor) {
        sensors.put(weatherType, sensor);
    }

    public void unsubscribe(String weatherType) {
        sensors.remove(weatherType);
    }

    public void notify(String weatherType) {
        WeatherSensor sensor = sensors.get(weatherType);
        sensor.onActivate();
    }
}
