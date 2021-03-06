/*
 * default settings
 * <pre>
 *   moduleName:      "nodefony"
 *   maxStack:        100
 *   rateLimit:       false
 *   burstLimit:      3
 *   defaultSeverity: "DEBUG"
 *   checkConditions: "&&"
 *
 * </pre>
 */
const defaultSettings = {
  moduleName: "SYSLOG",
  msgid: "",
  maxStack: 100,
  rateLimit: false,
  burstLimit: 3,
  defaultSeverity: "DEBUG",
  checkConditions: "&&"
};

/*
 * Severity syslog
 * <pre>
 *    EMERGENCY   = 0
 *    ALERT       = 1
 *    CRITIC      = 2
 *    ERROR       = 3
 *    WARNING     = 4
 *    NOTICE      = 5
 *    INFO        = 6
 *    DEBUG       = 7
 * </pre>
 */
const sysLogSeverity = [
    "EMERGENCY",
    "ALERT",
    "CRITIC",
    "ERROR",
    "WARNING",
    "NOTICE",
    "INFO",
    "DEBUG"
  ];
sysLogSeverity.EMERGENCY = 0;
sysLogSeverity.ALERT = 1;
sysLogSeverity.CRITIC = 2;
sysLogSeverity.ERROR = 3;
sysLogSeverity.WARNING = 4;
sysLogSeverity.NOTICE = 5;
sysLogSeverity.INFO = 6;
sysLogSeverity.DEBUG = 7;

/**
 *  Protocol Data Unit
 * @class  PDU
 * @constructor
 * @module library
 * @return {PDU}
 */
let guid = 0;
nodefony.PDU = class PDU {
  constructor(pci, severity, moduleName, msgid, msg, date) {
    /* timeStamp @type Date*/
    this.timeStamp = new Date(date).getTime() || new Date().getTime();
    /* uid */
    this.uid = ++guid;
    /* severity */
    this.severity = translateSeverity(severity) || translateSeverity("INFO");
    /* severityName */
    this.severityName = sysLogSeverity[this.severity];
    /* typePayload */
    this.typePayload = nodefony.typeOf(pci);
    /*
     * protocole controle information
     * @type Void
     */
    this.payload = pci;
    /* moduleName */
    this.moduleName = moduleName || "nodefony";
    /* msgid */
    this.msgid = msgid || "";
    /* msg */
    this.msg = msg || "";
  }

  /**
   * Get Date in string format
   * @method getDate
   * @return {String} a date in string format .
   */
  getDate() {
    return new Date(this.timeStamp).toTimeString();
  }

  /**
   * get a string representating the PDU protocole
   * @method toString
   * @return {String}  .
   */
  toString() {
    return "TimeStamp:" + this.getDate() +
      "  Log:" + this.payload +
      "  ModuleName:" + this.moduleName +
      "  SeverityName:" + this.severityName +
      "  MessageID:" + this.msgid +
      "  UID:" + this.uid +
      "  Message:" + this.msg;
  }

  parseJson(str) {
    let json = null;
    try {
      json = JSON.parse(str);
      for (let ele in json) {
        if (ele in this) {
          this[ele] = json[ele];
        }
      }
    } catch (e) {
      throw e;
    }
    return json;
  }
};

const operators = {
  "<": function (ele1, ele2) {
    return ele1 < ele2;
  },
  ">": function (ele1, ele2) {
    return ele1 > ele2;
  },
  "<=": function (ele1, ele2) {
    return ele1 <= ele2;
  },
  ">=": function (ele1, ele2) {
    return ele1 >= ele2;
  },
  "==": function (ele1, ele2) {
    return ele1 === ele2;
  },
  "!=": function (ele1, ele2) {
    return ele1 !== ele2;
  },
  "RegExp": function (ele1, ele2) {
    return (ele2.test(ele1));
  }
};

const conditionsObj = {
  severity: (pdu, condition) => {
    if (condition.operator !== "==") {
      return operators[condition.operator](pdu.severity, condition.data);
    } else {
      for (let sev in condition.data) {
        if (sev === pdu.severityName) {
          return true;
        }
      }
    }
    return false;
  },
  msgid: (pdu, condition) => {
    if (condition.operator !== "==") {
      return operators[condition.operator](pdu.msgid, condition.data);
    } else {
      for (let sev in condition.data) {
        if (sev === pdu.msgid) {
          return true;
        }
      }
    }
    return false;
  },
  date: (pdu, condition) => {
    return operators[condition.operator](pdu.timeStamp, condition.data);
  }
};

const logicCondition = {
  "&&": (myConditions, pdu) => {
    let res = null;
    for (let ele in myConditions) {
      res = conditionsObj[ele](pdu, myConditions[ele]);
      if (!res) {
        break;
      }
    }
    return res;
  },
  "||": (myConditions, pdu) => {
    let res = null;
    for (let ele in myConditions) {
      res = conditionsObj[ele](pdu, myConditions[ele]);
      if (res) {
        break;
      }
    }
    return res;
  }
};

const checkFormatSeverity = (ele) => {
  let res = false;
  switch (nodefony.typeOf(ele)) {
  case "string":
    res = ele.split(/,| /);
    break;
  case "number":
    res = ele;
    break;
  default:
    throw new Error("checkFormatSeverity bad format " + nodefony.typeOf(ele) + " : " + ele);
  }
  return res;
};

const checkFormatDate = function (ele) {
  let res = false;
  switch (nodefony.typeOf(ele)) {
  case "date":
    res = ele.getTime();
    break;
  case "string":
    res = new Date(ele);
    break;
  default:
    throw new Error("checkFormatDate bad format " + nodefony.typeOf(ele) + " : " + ele);
  }
  return res;
};

const checkFormatMsgId = function (ele) {
  let res = false;
  switch (nodefony.typeOf(ele)) {
  case "string":
    res = ele.split(/,| /);
    break;
  case "number":
    res = ele;
    break;
  case "object":
    if (ele instanceof RegExp) {
      res = ele;
    }
    break;
  default:
    throw new Error("checkFormatMsgId bad format " + nodefony.typeOf(ele) + " : " + ele);
  }
  return res;
};

const severityToString = function (severity) {
  let myint = parseInt(severity, 10);
  let ele = null;
  if (!isNaN(myint)) {
    ele = sysLogSeverity[myint];
  } else {
    ele = severity;
  }
  if (ele in sysLogSeverity) {
    return ele;
  }
  return false;
};

const wrapperCondition = function (conditions, callback, context = null) {
  let myFuncCondition = null;
  let Conditions = null;
  try {
    if (conditions.checkConditions && conditions.checkConditions in logicCondition) {
      myFuncCondition = logicCondition[conditions.checkConditions];
      delete conditions.checkConditions;
    } else {
      myFuncCondition = logicCondition[this.settings.checkConditions];
    }
    Conditions = sanitizeConditions(conditions);
    switch (nodefony.typeOf(callback)) {
    case "function":
      return (pdu) => {
        let res = myFuncCondition(Conditions, pdu);
        if (res) {
          if (context) {
            callback.call(context, pdu);
          } else {
            callback(pdu);
          }
        }
      };
    case "array":
      let tab = [];
      for (let i = 0; i < callback.length; i++) {
        let res = myFuncCondition(Conditions, callback[i]);
        if (res) {
          tab.push(callback[i]);
        }
      }
      return tab;
    default:
      throw new Error("");
    }
  } catch (e) {
    throw e;
  }
};

const sanitizeConditions = function (settingsCondition) {
  let res = true;
  if (nodefony.typeOf(settingsCondition) !== "object") {
    return false;
  }
  for (let ele in settingsCondition) {
    if (!(ele in conditionsObj)) {
      return false;
    }
    let condi = settingsCondition[ele];

    if (condi.operator && !(condi.operator in operators)) {
      throw new Error("Contitions bad operator : " + condi.operator);
    }
    if (condi.data) {
      switch (ele) {
      case "severity":
        if (condi.operator) {
          res = checkFormatSeverity(condi.data);
          if (res !== false) {
            condi.data = sysLogSeverity[severityToString(res[0])];
          } else {
            return false;
          }
        } else {
          condi.operator = "==";
          res = checkFormatSeverity(condi.data);
          if (res !== false) {
            condi.data = {};
            if (nodefony.typeOf(res) === "array") {
              for (let i = 0; i < res.length; i++) {
                let mySeverity = severityToString(res[i]);
                if (mySeverity) {
                  condi.data[mySeverity] = sysLogSeverity[mySeverity];
                } else {
                  return false;
                }
              }
            } else {
              return false;
            }
          } else {
            return false;
          }
        }
        break;
      case "msgid":
        if (!condi.operator) {
          condi.operator = "==";
        }
        res = checkFormatMsgId(condi.data);
        if (res !== false) {
          if (nodefony.typeOf(res) === "array") {
            condi.data = {};
            for (let i = 0; i < res.length; i++) {
              condi.data[res[i]] = "||";
            }
          } else {
            condi.data = res;
          }
        } else {
          return false;
        }
        break;
      case "date":
        res = checkFormatDate(condi.data);
        if (res) {
          condi.data = res;
        } else {
          return false;
        }
        break;
      default:
        return false;
      }
    } else {
      return false;
    }
  }
  return settingsCondition;
  //console.log(settingsCondition);
};


const translateSeverity = function (severity) {
  let myseverity = null;
  if (severity in sysLogSeverity) {
    if (typeof severity === 'number') {
      myseverity = sysLogSeverity[sysLogSeverity[severity]];
    } else {
      myseverity = sysLogSeverity[severity];
    }
  } else {
    if (!severity) {
      return null;
    } else {
      throw new Error("not nodefony syslog severity :" + severity);
    }
  }
  return myseverity;
};

const createPDU = function (payload, severity, moduleName, msgid, msg) {
  let myseverity = null;
  if (!severity) {
    myseverity = sysLogSeverity[this.settings.defaultSeverity];
  } else {
    myseverity = severity;
  }
  return new nodefony.PDU(payload, myseverity,
    moduleName,
    msgid,
    msg);
};

/**
 * A class for product log in nodefony.
 *
 *    @class syslog
 *    @module library
 *    @constructor
 *    @param {Object} settings The settings to extend.
 *    @return syslog
 */
class Syslog extends nodefony.notificationsCenter.notification {

  constructor(settings) {

    super(settings);
    /**
     * extended settings
     * @property settings
     * @type Object
     * @see defaultSettings
     */
    this.settings = nodefony.extend({}, defaultSettings, settings);
    /**
     * ring buffer structure container instances of PDU
     * @property ringStack
     * @type Array
     */
    this.ringStack = [];
    /**
     * Ratelimit  Management log printed
     * @property burstPrinted
     * @type Number
     */
    this.burstPrinted = 0;
    /**
     * Ratelimit  Management log dropped
     * @property missed
     * @type Number
     */
    this.missed = 0;
    /**
     * Management log invalid
     * @property invalid
     * @type Number
     */
    this.invalid = 0;

    /**
     * Counter log valid
     * @property valid
     * @type Number
     */
    this.valid = 0;
    /**
     * Ratelimit  Management begin of burst
     * @property start
     * @private
     * @type Number
     */
    this.start = 0;
  }

  pushStack(pdu) {
    if (this.ringStack.length === this.settings.maxStack) {
      this.ringStack.shift();
    }
    let index = this.ringStack.push(pdu);
    this.valid++;
    return index;
  }

  /**
   * logger message
   * @method logger
   * @param {void} payload payload for log. protocole controle information
   * @param {Number | String} severity severity syslog like.
   * @param {String} msgid informations for message. example(Name of function for debug)
   * @param {String} msg  message to add in log. example (I18N)
   */
  logger(payload, severity, msgid, msg) {
    let pdu = null;
    if (this.settings.rateLimit) {
      let now = new Date().getTime();
      this.start = this.start || now;
      if (now > this.start + this.settings.rateLimit) {
        this.burstPrinted = 0;
        this.missed = 0;
        this.start = 0;
      }
      if (this.settings.burstLimit && this.settings.burstLimit > this.burstPrinted) {
        try {
          if (payload instanceof nodefony.PDU) {
            pdu = payload;
          } else {
            pdu = createPDU.call(this, payload, severity, this.settings.moduleName, msgid || this.settings.msgid, msg);
          }
        } catch (e) {
          console.trace(e);
          this.invalid++;
          return "INVALID";
        }
        this.pushStack(pdu);
        this.fire("onLog", pdu);
        this.burstPrinted++;
        return "ACCEPTED";
      }
      this.missed++;
      return "DROPPED";
    } else {
      try {
        if (payload instanceof nodefony.PDU) {
          pdu = payload;
        } else {
          pdu = createPDU.call(this, payload, severity, this.settings.moduleName, msgid || this.settings.msgid, msg);
        }
      } catch (e) {
        console.trace(e);
        this.invalid++;
        return "INVALID";
      }
      this.pushStack(pdu);
      this.fire("onLog", pdu);
      return "ACCEPTED";
    }
  }



  /**
   * Clear stack of logs
   *
   * @method clearLogStack
   *
   *
   *
   */
  clearLogStack() {
    this.ringStack.length = 0;
  }

  /**
   * get hitory of stack
   * @method getLogStack
   * @param {Number} start .
   * @param {Number} end .
   * @return {array} new array between start end
   * @return {PDU} pdu
   */
  getLogStack(start, end, contition) {
    let stack = this.getLogs(contition);
    if (arguments.length === 0) {
      return stack[stack.length - 1];
    }
    if (!end) {
      return stack.slice(start);
    }
    if (start === end) {
      return stack[stack.length - start - 1];
    }
    return stack.slice(start, end);
  }

  /**
   * get logs with conditions
   * @method getLogs
   * @param {Object} conditions .
   * @return {array} new array with matches conditions
   */
  getLogs(conditions = null, stack = null) {
    if (conditions) {
      return wrapperCondition.call(this, conditions, stack || this.ringStack);
    }
    return this.ringStack;
  }

  /**
   * take the stack and build a JSON string
   * @method logToJson
   * @return {String} string in JSON format
   */
  logToJson(conditions, stack = null) {
    let res = null;
    if (conditions) {
      res = this.getLogs(conditions, stack);
    } else {
      res = this.ringStack;
    }
    return JSON.stringify(res);
  }

  /**
   * load the stack as JSON string
   * @method loadStack
   * @param {Object} json or string stack serialize
   * @param {boolean} fire conditions events  .
   * @param {function} callback before fire conditions events
   * @return {String}
   */
  loadStack(stack, doEvent = false, beforeConditions = null) {
    let st = null;
    if (!stack) {
      throw new Error("syslog loadStack : not stack in arguments ");
    }
    switch (nodefony.typeOf(stack)) {
    case "string":
      try {
        //console.log(stack);
        st = JSON.parse(stack);
        return this.loadStack(st, doEvent, beforeConditions);
      } catch (e) {
        throw e;
      }
      break;
    case "array":
    case "object":
      try {
        for (let i = 0; i < stack.length; i++) {
          let pdu = new nodefony.PDU(stack[i].payload, stack[i].severity, stack[i].moduleName || this.settings.moduleName, stack[i].msgid, stack[i].msg, stack[i].timeStamp);
          this.pushStack(pdu);
          if (doEvent) {
            if (beforeConditions && typeof beforeConditions === "function") {
              beforeConditions.call(this, pdu, stack[i]);
            }
            this.fire("onLog", pdu);
          }
        }
      } catch (e) {
        throw e;
      }
      break;
    default:
      throw new Error("syslog loadStack : bad stack in arguments type");
    }
    return st || stack;
  }

  /**
   *
   *    @method  filter
   *
   */
  filter(conditions = null, callback = null, context = null) {
    if (!conditions) {
      throw new Error("filter conditions not found ");
    }
    try {
      let wrapper = wrapperCondition.call(this, conditions, callback, context);
      if (wrapper) {
        return super.on("onLog", wrapper);
      }
      return null;
    } catch (e) {
      throw e;
    }
  }

  /**
   *
   *    @method  listenWithConditions
   *
   */
  listenWithConditions(context, conditions, callback) {
    return this.filter(conditions, callback, context);
  }

  log() {
    return this.logger.apply(this, arguments);
  }

  error(data) {
    return this.logger(data, "ERROR");
  }

  warning(data) {
    return this.logger(data, "WARNING");
  }

  info(data) {
    return this.logger(data, "INFO");
  }

  debug(data) {
    return this.logger(data, "DEBUG");
  }

  trace(data) {
    return this.logger(data, "NOTICE");
  }
}

nodefony.syslog = Syslog;
module.exports = Syslog;