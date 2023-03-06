package main

import (
    "fmt"
    "log"
    "os"
)

const (
    TRACE = iota
    DEBUG
    INFO
    WARN
    ERROR
    FATAL
)

type Logger struct {
    level  int
    logger *log.Logger
}

func NewLogger() *Logger {
    var logFile *os.File
    logFile, err := os.OpenFile("/var/log/simplog.log", os.O_CREATE | os.O_WRONLY | os.O_APPEND, 0644)
    if err != nil {
        fmt.Println(err)
        logFile = os.Stdout
    }

    l := Logger{
        level:  DEBUG,
        logger: log.New(logFile, "", log.LstdFlags),
    }

    return &l
}

func (l *Logger) Level() int {
    return l.level
}

func (l *Logger) SetLevel(level int) {
    l.level = level
}

func (l *Logger) Trace(format string, v ...interface{}) {
    if l.level <= TRACE {
        l.logger.Printf("[TRACE] " + format, v...)
    }
}

func (l *Logger) Debug(format string, v ...interface{}) {
    if l.level <= DEBUG {
        l.logger.Printf("[DEBUG] " + format, v...)
    }
}

func (l *Logger) Info(format string, v ...interface{}) {
    if l.level <= INFO {
        l.logger.Printf("[INFO] " + format, v...)
    }
}

func (l *Logger) Warn(format string, v ...interface{}) {
    if l.level <= WARN {
        l.logger.Printf("[WARN] " + format, v...)
    }
}

func (l *Logger) Error(format string, v ...interface{}) {
    if l.level <= ERROR {
        l.logger.Printf("[ERROR] " + format, v...)
    }
}

func (l *Logger) Fatal(format string, v ...interface{}) {
    if l.level <= FATAL {
        l.logger.Printf("[FATAL] " + format, v...)
    }
}
