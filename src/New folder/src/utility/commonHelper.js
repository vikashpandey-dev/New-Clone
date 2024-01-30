import { atob } from "abab";
import moment from "moment";

export function FilterSubCategory(arr) {
  if (arr.length > 0) {
    let newArr = arr.map((ele) => {
      ele = { ...ele, value: ele._id, label: ele.name };
      return ele;
    });
    return newArr;
  }
  return [];
}

export function convertToInternationalCurrencySystem(labelValue) {
  // Nine Zeroes for Billions
  return Math.abs(Number(labelValue)) >= 1.0e9
    ? (Math.abs(Number(labelValue)) / 1.0e9).toFixed(2) + "B"
    : // Six Zeroes for Millions
    Math.abs(Number(labelValue)) >= 1.0e6
    ? (Math.abs(Number(labelValue)) / 1.0e7).toFixed(1) + ` Cr`
    : // Three Zeroes for Thousands
    Math.abs(Number(labelValue)) >= 1.0e3
    ? (Math.abs(Number(labelValue)) / 1.0e3).toFixed(2) + "K"
    : Math.abs(Number(labelValue));
}

export function ASLALogic(isStatus, DelayStatus) {
  if (DelayStatus) {
    return "#FF9080";
  }
  if (isStatus == "Completed") {
    return "#00A72D";
  }
  return "#00A72D";
}

export const changeDateFormat = (date, format, dateFormat) => {
  if (dateFormat) {
    return moment(date, dateFormat).format(format ? format : "DD MMM, YY");
  }
  return moment(date).format(format ? format : "DD MMM, YY");
};

export const utcFormat = (date, format, dateFormat) => {
  if (dateFormat) {
    return moment
      .utc(date, dateFormat)
      .format(format ? format : "DD MMM yyyy hh:mm a");
  }
  return moment.utc(date).format(format ? format : "DD MMM yyyy hh:mm a");
};

export function strToDate(str, formate) {
  return moment(str, formate);
}

export function chateDateManage(date) {
  const cDate = new Date();
  if (moment(date).isAfter(cDate, "year")) {
    return changeDateFormat(date, "DD MMM yyyy");
  }
  return changeDateFormat(date, "ddd, DD, MMM");
}

function groupedDays(messages) {
  return messages.reduce((acc, el, i) => {
    const messageDay = moment(el.date).format("YYYY-MM-DD");
    if (acc[messageDay]) {
      return { ...acc, [messageDay]: acc[messageDay].concat([el]) };
    }
    return { ...acc, [messageDay]: [el] };
  }, {});
}

export function generateItems(messages) {
  if (messages !== []) {
    const days = groupedDays(messages);
    const sortedDays = Object.keys(days).sort(
      (x, y) => moment(x, "YYYY-MM-DD").unix() - moment(y, "YYYY-MM-DD").unix()
    );
    const items = sortedDays.reduce((acc, date) => {
      const sortedMessages = days[date].sort(
        (x, y) => new Date(x.date) - new Date(y.date)
      );
      return acc.concat([...sortedMessages, { type: "day", date, id: date }]);
    }, []);
    return items;
  }
  return [];
}

export function utcDate(str, formate) {
  if (formate) {
    return moment(str, formate)
      .utc()
      .format(formate ? formate : "yyyy-MM-DD HH:mm:ss.SSS")
      .toString();
  }
  return moment(str)
    .utc()
    .format(formate ? formate : "yyyy-MM-DD HH:mm:ss.SSS")
    .toString();
}

export function bytesToSize(bytes) {
  var sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  if (bytes == 0) return "0 Byte";
  var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
  return Math.round(bytes / Math.pow(1024, i), 2) + " " + sizes[i];
}

const base64toBlob = (data, mimeType) => {
  // Cut the prefix `data:application/pdf;base64` from the raw base 64
  const base64WithoutPrefix = data.substr(`data:${mimeType};base64,`.length);
  const bytes = atob(base64WithoutPrefix);
  let length = bytes.length;
  let out = new Uint8Array(length);
  while (length--) {
    out[length] = bytes.charCodeAt(length);
  }
  return new Blob([out], { type: mimeType });
};

export function getBaseStrToFile(baseStr, fileName) {
  try {
    let extension = fileName.split(".").pop();
    let blob = base64toBlob(baseStr, `application/${extension}`);
    let url = URL.createObjectURL(blob);
    const size = bytesToSize(blob.size);
    return {
      fileSize: size,
      fileName: fileName,
    };
  } catch (error) {
    return null;
  }
}

export const validateAge = (date, limit) => {
  // can't select Future date
  if (date > new Date()) {
    return {
      status: false,
      message: "You can't select future Date",
    };
  }

  // can't select Todays date
  if (date.toJSON().slice(0, 10) == new Date().toJSON().slice(0, 10)) {
    return {
      status: false,
      message: "You can't select todays Date",
    };
  }

  // Can't select < limit
  if (parseInt(new Date().getFullYear() - date.getFullYear()) < limit) {
    return {
      status: false,
      message: "Your Age Should be grater than" + limit,
    };
  }

  // if select = limit not can't be in less month and date
  if (parseInt(new Date().getFullYear() - date.getFullYear()) == limit) {
    if (parseInt(new Date().getMonth() - date.getMonth()) < 0) {
      return {
        status: false,
        message: "Your Age Should be grater than" + limit,
      };
    } else if (parseInt(new Date().getMonth() - date.getMonth()) == 0) {
      if (parseInt(new Date().getDate() - date.getDate()) < 0) {
        return {
          status: false,
          message: "Your Age Should be grater than" + limit,
        };
      }
    }
  }

  return {
    status: true,
  };
};

export const MGSessionUser = async () => {
  let istoken = await AsyncStorage.getItem("@MG_LOGIN");

  if (istoken) {
    const decryptData = JSON.parse(
      atob(await AsyncStorage.getItem("@MG_LOGIN"))
    );
    return decryptData;
  }
  return "";
};

export const HCSessionUser = async () => {
  let istoken = await AsyncStorage.getItem("@HC_LOGIN");
  if (istoken) {
    const decryptData = JSON.parse(
      atob(await AsyncStorage.getItem("@HC_LOGIN"))
    );
    return decryptData;
  }
  return "";
};

export const DateDiff = {
  inDays: function (d1, d2) {
    var t2 = d2.getTime();
    var t1 = d1.getTime();

    return parseInt((t2 - t1) / (24 * 3600 * 1000));
  },

  inWeeks: function (d1, d2) {
    var t2 = d2.getTime();
    var t1 = d1.getTime();

    return parseInt((t2 - t1) / (24 * 3600 * 1000 * 7));
  },

  inMonths: function (d1, d2) {
    var d1Y = d1.getFullYear();
    var d2Y = d2.getFullYear();
    var d1M = d1.getMonth();
    var d2M = d2.getMonth();

    return d2M + 12 * d2Y - (d1M + 12 * d1Y);
  },

  inYears: function (d1, d2) {
    return d2.getFullYear() - d1.getFullYear();
  },
};

export const monthTonumber = (month) => {
  var months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const monthnumber = months.findIndex((data, index) => data == month) + 1;
  return monthnumber;
};
