package patterns.observer;

public class WeatherController {
    private WeatherMonitor monitor = new WeatherMonitor();

    public WeatherMonitor getMonitor() {
        return monitor;
    }

    public void rain() {
        if (monitor != null) {
            monitor.notify("rain");
        }
    }

    public void snow() {
        if (monitor != null) {
            monitor.notify("snow");
        }
    }
}
