import * as dayjs from "dayjs";
import { ciemeTable, cell, isActive } from "@/styles/base.module.scss";

export class CiemeCalendar {
  _dayjs = dayjs;
  _formatStr = "YYYY-MM-DD HH:mm:ss";
  /**
   * 参数传进来的时间
   */
  _date;
  /**
   * 月开始
   */
  strMap = {
    "1": "一",
    "2": "二",
    "3": "三",
    "4": "四",
    "5": "五",
    "6": "六",
    "7": "日",
  };
  get _monthStarDate() {
    return this._date.startOf("month");
  }
  get _monthEndDate() {
    return dayjs(this._date).endOf("month");
  }
  get _monthStarDateFormat() {
    return this._monthStarDate.format(this._formatStr);
  }
  get _monthEndDateFormat() {
    return this._monthEndDate.format(this._formatStr);
  }
  dom: HTMLDivElement = null;

  constructor(dom: HTMLDivElement, date: Date | string = new Date()) {
    this.dom = dom;
    this.update(dom, date);
  }

  update(dom: HTMLDivElement, date) {
    this._date = dayjs(date);
    this.genTable();
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
    const _this = this;
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
          cellDiv.innerText = date.format("DD");
          td.appendChild(cellDiv);
          tr.appendChild(td);
          cellDiv.addEventListener("click", () => {
            const hasValue = this.value.some((value) => {
              return dayjs(value).isSame(date);
            });
            if (hasValue) {
              const index = this.value.indexOf(
                date.format("YYYY-MM-DD HH:mm:ss"),
              );
              if (index > -1) {
                this.value.splice(index, 1);
              }
            } else {
              this.value.push(date.format("YYYY-MM-DD HH:mm:ss"));
            }
            _this.change();
          });
          this.cellList.push(cellDiv);
        }
      });
      tbody.appendChild(tr);
    });
    return tbody;
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
  change() {
    this.updateActive();
  }
}
