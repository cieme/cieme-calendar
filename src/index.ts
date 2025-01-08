import { CiemeCalendar } from "./utils/CiemeCalendar";
const div = document.createElement("div");
document.body.appendChild(div);
const x = new CiemeCalendar(div);

console.log(x._monthStarDateFormat);
console.log(x._monthEndDateFormat);
x.setValue("2025-01-01,2025-01-10");
