import {Router as YrvRouter, Route as YrvRoute} from "./web_modules/yrv.js";
import {Welcome} from "./views/index.js";
import Typography2 from "./views/Typography.js";
import Example2 from "./views/Example.js";
YrvRouter.hashchange = true;
export {YrvRouter, YrvRoute};
export var ShowcaseStatus;
(function(ShowcaseStatus2) {
  ShowcaseStatus2["TODO"] = "TODO";
  ShowcaseStatus2["STABLE"] = "stable";
  ShowcaseStatus2["UNSTABLE"] = "unstable";
  ShowcaseStatus2["UNTESTED"] = "untested";
  ShowcaseStatus2["UNDOCUMENTED"] = "undocumented";
  ShowcaseStatus2["UNTRANSLATED"] = "untranslated";
})(ShowcaseStatus || (ShowcaseStatus = {}));
export class ShowcaseRouter {
  constructor() {
    this.routes = [];
    this.unwrap = () => this.routes;
  }
  add(path = "/", title = "N/A", component = Example2, status = ShowcaseStatus.TODO) {
    this.routes.push({path, title, component, status});
    return this;
  }
}
export const Routes = new ShowcaseRouter().add("/", "Introduction", Welcome).add("/components/button", "Button").add("/components/icon", "Icon").add("/components/typography", "Typography", Typography2, ShowcaseStatus.STABLE).add("/components/divider", "Divider").add("/components/grid", "Grid").add("/components/layout", "Layout").add("/components/space", "Space").add("/components/affix", "Affix").add("/components/breadcrumb", "Breadcrumb").add("/components/dropdown", "Dropdown").add("/components/menu", "Menu").add("/components/pageheader", "PageHeader").add("/components/pagination", "Pagination").add("/components/steps", "Steps").add("/components/autocomplete", "AutoComplete").add("/components/cascader", "Cascader").add("/components/checkbox", "Checkbox").add("/components/datepicker", "DatePicker").add("/components/form", "Form").add("/components/input", "Input").add("/components/inputnumber", "InputNumber").add("/components/mentions", "Mentions").add("/components/radio", "Radio").add("/components/rate", "Rate").add("/components/select", "Select").add("/components/slider", "Slider").add("/components/switch", "Switch").add("/components/timepicker", "TimePicker").add("/components/transfer", "Transfer").add("/components/treeselect", "TreeSelect").add("/components/upload", "Upload").add("/components/avatar", "Avatar").add("/components/badge", "Badge").add("/components/calendar", "Calendar").add("/components/card", "Card").add("/components/carousel", "Carousel").add("/components/collapse", "Collapse").add("/components/comment", "Comment").add("/components/descriptions", "Descriptions").add("/components/empty", "Empty").add("/components/image", "Image").add("/components/list", "List").add("/components/popover", "Popover").add("/components/statistic", "Statistic").add("/components/table", "Table").add("/components/tabs", "Tabs").add("/components/tag", "Tag").add("/components/timeline", "Timeline").add("/components/tooltip", "Tooltip").add("/components/tree", "Tree").add("/components/alert", "Alert").add("/components/drawer", "Drawer").add("/components/message", "Message").add("/components/modal", "Modal").add("/components/notification", "Notification").add("/components/popconfirm", "Popconfirm").add("/components/progress", "Progress").add("/components/result", "Result").add("/components/skeleton", "Skeleton").add("/components/spin", "Spin").add("/components/anchor", "Anchor").add("/components/backtop", "BackTop").add("/components/configprovider", "ConfigProvider").unwrap();
