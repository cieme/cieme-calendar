import * as dayjs from "dayjs";
import { ciemeTable, cell, isActive } from "@/styles/base.module.scss";

const defaultOptions = {
  selector: "",
  format: "YYYY-MM-DD",
  cellFormat: "DD",
  separator: ",",
  onChange: () => {},
};
interface IOptions {
  selector: string | HTMLElement;
  format?: string;
  cellFormat?: string;
  separator?: string;
  onChange?: (value: string[]) => void;
}
export class CiemeCalendar {
  _dayjs = dayjs;
  /**
   * 参数传进来的时间,转为 dayjs 对象
   */
  _date;
  get _monthStarDate() {
    return this._date.startOf("month");
  }
  get _monthEndDate() {
    return dayjs(this._date).endOf("month");
  }
  get _monthStarDateFormat() {
    return this._monthStarDate.format(this._options.format);
  }
  get _monthEndDateFormat() {
    return this._monthEndDate.format(this._options.format);
  }
  dom: Element = null;
  _options;
  constructor(_options: IOptions = defaultOptions) {
    this._options = { ...defaultOptions, ..._options };
    const { date } = this._options;
    this._date = dayjs(date);
    this.getDom();
    this.update(date);
  }
  // 处理 dom
  getDom() {
    const { selector } = this._options;
    if (selector) {
      if (selector instanceof Element) {
        this.dom = selector;
      } else {
        this.dom = document.querySelector(selector);
      }
    } else {
      this.dom = document.createElement("div");
      document.body.appendChild(this.dom);
    }
  }

  update(date) {
    this.dispose();
    this._date = dayjs(date);
    this.genTable();
    this.updateActive();
  }
  dispose() {
    this.dom.innerHTML = "";
    this.cellList = [];
    this.list = [];
  }
  destroy() {
    this.dispose();
    this.dom = null;
  }
  genTable() {
    const header = this.genTableHeader();
    const body = this.genTableBody();
    const table = document.createElement("table");
    table.className = ciemeTable;
    table.appendChild(header);
    table.appendChild(body);
    this.dom.appendChild(table);
  }
  genTableHeader() {
    const header = document.createElement("tr");
    const ths = ["日", "一", "二", "三", "四", "五", "六"];
    ths.forEach((th) => {
      const thNode = document.createElement("th");

      const cellDiv = document.createElement("div");
      cellDiv.className = cell;
      cellDiv.innerText = th;
      thNode.appendChild(cellDiv);
      header.appendChild(thNode);
    });
    return header;
  }
  list = [];
  cellList = [];
  genList() {
    const { _monthStarDate, _monthEndDate } = this;
    const startDate = dayjs(_monthStarDate).day(0);
    const endDate = dayjs(_monthEndDate).day(6);

    this.list = [];
    let current = startDate;
    while (endDate.isAfter(current)) {
      this.list.push(current);
      current = current.add(1, "day");
    }
  }
  genTableBody() {
    const tbody = document.createElement("tbody");
    this.cellList = [];
    this.genList();
    const deepList = this.splitList();
    deepList.forEach((item) => {
      const tr = document.createElement("tr");

      item.forEach((date) => {
        if (
          date.isBefore(this._monthStarDate) ||
          date.isAfter(this._monthEndDate)
        ) {
          const td = document.createElement("td");
          tr.appendChild(td);
        } else {
          const td = document.createElement("td");
          const cellDiv = document.createElement("div");
          cellDiv.className = cell;
          cellDiv.dataset._date = date;
          cellDiv.innerText = date.format(this._options.cellFormat);
          td.appendChild(cellDiv);
          tr.appendChild(td);
          cellDiv.addEventListener("click", () => this.onCellClick(date));
          this.cellList.push(cellDiv);
        }
      });
      tbody.appendChild(tr);
    });
    return tbody;
  }
  onCellClick(date) {
    const hasValue = this.value.some((value) => {
      return dayjs(value).isSame(date);
    });
    if (hasValue) {
      const index = this.value.findIndex((item) => dayjs(item).isSame(date));
      if (index > -1) {
        this.value.splice(index, 1);
      }
    } else {
      console.log(this._options);
      this.value.push(date.format(this._options.format));
    }
    this.emitChange();
  }
  splitList() {
    const { list } = this;
    const len = list.length;
    const arr = [];
    for (let i = 0; i < len; i += 7) {
      arr.push(list.slice(i, i + 7));
    }
    return arr;
  }
  value = [];
  setValue(value: string) {
    if (value && typeof value === "string") {
      value = value.trim();
      const arrValue = value.split(",");
      this.value = arrValue;
    }
    this.updateActive();
  }
  updateActive() {
    this.cellList.forEach((cell) => {
      const date = cell.dataset._date;
      const isActiveDate = this.value.some((item) => {
        return dayjs(item).startOf("day").isSame(date); // 注意此处需要对 date 格式进行匹配，保证 value 和 date 格式一致，可以采用 dayjs 库提供的 isSame 方法
      });
      if (isActiveDate) {
        cell.classList.add(isActive);
      } else {
        cell.classList.remove(isActive);
      }
    });
  }
  emitChange() {
    this.updateActive();
    this._options.onChange(this.value);
  }
}
