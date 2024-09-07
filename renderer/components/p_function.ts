'use client';
import dayjs, { Dayjs } from 'dayjs';
import _ from 'lodash';

export function getWeekNumber(weekStartTime: string | Dayjs | Date, currentTime?: string | Dayjs | Date) {
  let start = dayjs(weekStartTime);
  let current = dayjs(currentTime);
  let startDate = start.startOf('week').valueOf();
  let currentDate = current.startOf('week').valueOf();
  let timeDifference = currentDate - startDate;
  const weekNumber = Math.floor(timeDifference / (7 * 24 * 60 * 60 * 1000)) + 1;
  return weekNumber;
}

export function getWeekDate(Time?: string | Dayjs | Date) {
  var day = dayjs(Time).day();
  var weeks = new Array('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday');
  var week = weeks[day];
  return week;
}

/**
 * @param classSchedule JSON, use generateConfig()
 * @param day 星期
 * @example
  let classes = listClassesForDay(
  classSchedule,
  getWeekDate().toLowerCase(),
  getWeekNumber(classSchedule.weekStartDate) % 2 == 1
);
*/
export function listClassesForDay(classSchedule, day: string, isSingleWeek: boolean = true) {
  if (classSchedule.single && classSchedule.single[day]) {
    let classes = classSchedule.single[day];
    if (!isSingleWeek) {
      if (classSchedule.double && classSchedule.double[day]) {
        for (const key in classSchedule.double[day]) {
          if (Object.hasOwnProperty.call(classSchedule.double[day], key)) {
            const element = classSchedule.double[day][key];
            const { startTime, endTime, subject } = element;
            if (startTime && endTime && subject) {
              classes[key] = element;
            }
          }
        }
      }
    }
    return classes;
  } else {
    return null;
  }
}

/**
 * @example
  (async () => {
  let inputTime = dayjs();
  let changed = (await getChangeDay(true, inputTime)) as Dayjs;
  changed = changed.set('h', inputTime.get('h')).set('m', inputTime.get('m')).set('s', inputTime.get('s'));
  console.log(changed);
})();
*/
export async function getChangeDay(parse_out: boolean = true, currentTime?: string | Dayjs | Date): Promise<undefined | string | Dayjs> {
  const days_origin = (await getConfigSync('lessonsList.changeDay')) as string | undefined;
  if (!days_origin) return;
  const days = [...days_origin.matchAll(/(\d{4}\/\d{1,2}\/\d{1,2})[ ]*?-[ ]*?(\d{4}\/\d{1,2}\/\d{1,2})/g)];
  const now = dayjs(currentTime);
  for (const key in days) {
    if (Object.prototype.hasOwnProperty.call(days, key)) {
      const day = days[key];
      const daySource = dayjs(day[1]);
      if (now.isSame(daySource, 'day')) {
        const dayTransform = parse_out ? dayjs(day[2]) : day[2];
        return dayTransform;
      }
    }
  }
}

export async function getConfigSync(name?: string, timeout: number = 0) {
  return new Promise((resolve, reject) => {
    try {
      let signal = crypto.randomUUID();
      window.ipc.send('get-config', signal, name);
      let timer =
        timeout <= 0
          ? null
          : setTimeout(() => {
              reject(`timeout (${timeout} ms)`);
            }, timeout);
      window.ipc.once('get-config/' + signal, data => {
        clearTimeout(timer);
        resolve(data);
      });
    } catch (error) {
      reject(error);
    }
  });
}
export async function getVersionSync(timeout: number = 0) {
  return new Promise((resolve, reject) => {
    try {
      window.ipc.send('get-version');
      let timer =
        timeout <= 0
          ? null
          : setTimeout(() => {
              reject(`timeout (${timeout} ms)`);
            }, timeout);
      window.ipc.once('get-version', (data: string) => {
        clearTimeout(timer);
        resolve(data);
      });
    } catch (error) {
      reject(error);
    }
  });
}

export async function generateConfig() {
  let data_name = (await getConfigSync('lessonsList.name')) as Array<{
    [key: string]: string;
  }>;
  let data_time = (await getConfigSync('lessonsList.time')) as Array<{
    [key: string]: string;
  }>;
  let data_weekStart = (await getConfigSync('lessonsList.weekStart')) as string;
  let new_classSchedule = {
    weekStartDate: data_weekStart,
    single: {
      sunday: {},
      monday: {},
      tuesday: {},
      wednesday: {},
      thursday: {},
      friday: {},
      saturday: {},
    },
    double: {
      sunday: {},
      monday: {},
      tuesday: {},
      wednesday: {},
      thursday: {},
      friday: {},
      saturday: {},
    },
  };
  data_name &&
    data_name.forEach((rowDate, rowIndex) => {
      if (rowDate && rowDate['all']) {
        let name = rowDate['all'].split('\n');
        if (name[0]) {
          new_classSchedule.single = _.mapValues(new_classSchedule.single, object => {
            return { ...object, [rowIndex]: { subject: name[0] } };
          });
        }
        if (name[1]) {
          new_classSchedule.double = _.mapValues(new_classSchedule.double, object => {
            return { ...object, [rowIndex]: { subject: name[1] } };
          });
        }
      }
      _.mapValues(rowDate, function (value, key) {
        if (key != 'all') {
          let name = rowDate[key].split('\n');
          if (name[0]) {
            !new_classSchedule.single[key][rowIndex] && (new_classSchedule.single[key][rowIndex] = {});
            new_classSchedule.single[key][rowIndex].subject = name[0];
          }
          if (name[1]) {
            !new_classSchedule.double[key][rowIndex] && (new_classSchedule.double[key][rowIndex] = {});
            new_classSchedule.double[key][rowIndex].subject = name[1];
          }
        }
      });
    });
  data_time &&
    data_time.forEach((rowDate, rowIndex) => {
      if (rowDate && rowDate['all']) {
        let name = rowDate['all'].split('-');
        if (name[0]) {
          _.mapValues(new_classSchedule.single, (value, key) => {
            !new_classSchedule.single[key][rowIndex] && (new_classSchedule.single[key][rowIndex] = {});
            new_classSchedule.single[key][rowIndex].startTime = name[0];
          });
          _.mapValues(new_classSchedule.double, (value, key) => {
            !new_classSchedule.double[key][rowIndex] && (new_classSchedule.double[key][rowIndex] = {});
            new_classSchedule.double[key][rowIndex].startTime = name[0];
          });
        }
        if (name[1]) {
          _.mapValues(new_classSchedule.single, (value, key) => {
            !new_classSchedule.single[key][rowIndex] && (new_classSchedule.single[key][rowIndex] = {});
            new_classSchedule.single[key][rowIndex].endTime = name[1];
          });
          _.mapValues(new_classSchedule.double, (value, key) => {
            !new_classSchedule.double[key][rowIndex] && (new_classSchedule.double[key][rowIndex] = {});
            new_classSchedule.double[key][rowIndex].endTime = name[1];
          });
        }
      }
      _.mapValues(rowDate, function (value, key) {
        if (key != 'all') {
          let name = rowDate[key].split('-');
          !new_classSchedule.single[key][rowIndex] && (new_classSchedule.single[key][rowIndex] = {});
          !new_classSchedule.double[key][rowIndex] && (new_classSchedule.double[key][rowIndex] = {});
          if (name) {
            new_classSchedule.single[key][rowIndex].startTime = name[0];
            new_classSchedule.double[key][rowIndex].startTime = name[0];
            new_classSchedule.single[key][rowIndex].endTime = name[1];
            new_classSchedule.double[key][rowIndex].endTime = name[1];
          }
        }
      });
    });
  return new_classSchedule;
}

export function autoUnitSize(size: number) {
  let dataSize: number, dataUnit: string;
  if (size / Math.pow(1024, 0) < 1024) {
    dataSize = size / Math.pow(1024, 0);
    dataUnit = 'B';
  } else if (size / Math.pow(1024, 1) < 1024) {
    dataSize = size / Math.pow(1024, 1);
    dataUnit = 'KB';
  } else if (size / Math.pow(1024, 2) < 1024) {
    dataSize = size / Math.pow(1024, 2);
    dataUnit = 'MB';
  } else {
    dataSize = size / Math.pow(1024, 3);
    dataUnit = 'GB';
  }
  return {
    dataSize,
    dataUnit,
  };
}

export function formatSize(bytes: number) {
  let size: any = autoUnitSize(bytes);
  size = Math.trunc(size.dataSize * 100) / 100 + ' ' + size.dataUnit;
  return size;
}

export async function getAutoLaunchSync(timeout: number = 0): Promise<boolean> {
  return new Promise((resolve, reject) => {
    try {
      window.ipc.send('autoLaunch', 'get');
      let timer =
        timeout <= 0
          ? null
          : setTimeout(() => {
              reject(`timeout (${timeout} ms)`);
            }, timeout);
      window.ipc.once('autoLaunch', (data: boolean) => {
        clearTimeout(timer);
        resolve(data);
      });
    } catch (error) {
      reject(error);
    }
  });
}

export async function getSysInfoSync(action: any, timeout: number = 30 * 1000): Promise<boolean> {
  return new Promise((resolve, reject) => {
    try {
      let signal = crypto.randomUUID();
      window.ipc.send('systeminformation', signal, action);
      let timer =
        timeout <= 0
          ? null
          : setTimeout(() => {
              reject(`timeout (${timeout} ms)`);
            }, timeout);
      window.ipc.once('systeminformation/' + signal, (data: boolean) => {
        clearTimeout(timer);
        resolve(data);
      });
    } catch (error) {
      reject(error);
    }
  });
}
