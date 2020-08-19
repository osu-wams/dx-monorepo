import path from 'path';
import * as winston from 'winston';
import { GROUPER_ENV, GROUPER_LOG_FILE_PATH } from './constants';

const consoleTransport = () => {
  if (GROUPER_ENV !== 'production') {
    return new winston.transports.Console({
      format: winston.format.combine(winston.format.colorize(), winston.format.simple()),
    });
  }

  return new winston.transports.Console();
};

const transports = (): (winston.transports.ConsoleTransportInstance | winston.transports.FileTransportInstance)[] => {
  const instances: (winston.transports.ConsoleTransportInstance | winston.transports.FileTransportInstance)[] = [
    consoleTransport(),
  ];
  if (GROUPER_LOG_FILE_PATH) {
    instances.push(new winston.transports.File({ filename: path.join(GROUPER_LOG_FILE_PATH, 'grouper.log') }));
  }

  return instances;
};

const logger: winston.Logger = winston.createLogger({
  format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
  level: 'debug',
  transports: transports(),
});

export default logger;
