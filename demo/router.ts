import { Router as YrvRouter, Route as YrvRoute } from 'yrv'
import { Welcome } from './views'
import Typography from './views/Typography.svx'
import Example from './views/Example.svx'

/**
 * Enable (false) or disable (true) for history mode.
 * NOTE: Current production build is a SPA.
 */
YrvRouter.hashchange = true
export { YrvRouter, YrvRoute }

/**
 * Route / Component implementation status enum.
 * NOTE: We probably don't need all of these.
 */
export enum ShowcaseStatus {
    /** To be implemented / in progress */
    TODO = 'TODO',
    /** Stable release, ideally documented and tested */
    STABLE = 'stable',
    /** Sort of done but not stable yet */
    UNSTABLE = 'unstable',
    /** Need testing */
    UNTESTED = 'untested',
    /** Need documentation and examples */
    UNDOCUMENTED = 'undocumented',
    /** Need localization */
    UNTRANSLATED = 'untranslated'
}

type ShowcaseRoute = {
    path: string,
    title: string,
    component: any,
    status: ShowcaseStatus
}

export class ShowcaseRouter {
    routes: ShowcaseRoute[] = []
    add(
        path: string = '/',
        title: string = 'N/A',
        component: any = Example,
        status: ShowcaseStatus = ShowcaseStatus.TODO
    ) {
        this.routes.push({ path, title, component, status })
        return this
    }
    unwrap = () => this.routes
}

export const Routes: ShowcaseRoute[] = new ShowcaseRouter()
    .add('/', 'Introduction', Welcome)
    .add('/components/button', 'Button')
    .add('/components/icon', 'Icon')
    .add('/components/typography', 'Typography', Typography, ShowcaseStatus.STABLE)
    .add('/components/divider', 'Divider')
    .add('/components/grid', 'Grid')
    .add('/components/layout', 'Layout')
    .add('/components/space', 'Space')
    .add('/components/affix', 'Affix')
    .add('/components/breadcrumb', 'Breadcrumb')
    .add('/components/dropdown', 'Dropdown')
    .add('/components/menu', 'Menu')
    .add('/components/pageheader', 'PageHeader')
    .add('/components/pagination', 'Pagination')
    .add('/components/steps', 'Steps')
    .add('/components/autocomplete', 'AutoComplete')
    .add('/components/cascader', 'Cascader')
    .add('/components/checkbox', 'Checkbox')
    .add('/components/datepicker', 'DatePicker')
    .add('/components/form', 'Form')
    .add('/components/input', 'Input')
    .add('/components/inputnumber', 'InputNumber')
    .add('/components/mentions', 'Mentions')
    .add('/components/radio', 'Radio')
    .add('/components/rate', 'Rate')
    .add('/components/select', 'Select')
    .add('/components/slider', 'Slider')
    .add('/components/switch', 'Switch')
    .add('/components/timepicker', 'TimePicker')
    .add('/components/transfer', 'Transfer')
    .add('/components/treeselect', 'TreeSelect')
    .add('/components/upload', 'Upload')
    .add('/components/avatar', 'Avatar')
    .add('/components/badge', 'Badge')
    .add('/components/calendar', 'Calendar')
    .add('/components/card', 'Card')
    .add('/components/carousel', 'Carousel')
    .add('/components/collapse', 'Collapse')
    .add('/components/comment', 'Comment')
    .add('/components/descriptions', 'Descriptions')
    .add('/components/empty', 'Empty')
    .add('/components/image', 'Image')
    .add('/components/list', 'List')
    .add('/components/popover', 'Popover')
    .add('/components/statistic', 'Statistic')
    .add('/components/table', 'Table')
    .add('/components/tabs', 'Tabs')
    .add('/components/tag', 'Tag')
    .add('/components/timeline', 'Timeline')
    .add('/components/tooltip', 'Tooltip')
    .add('/components/tree', 'Tree')
    .add('/components/alert', 'Alert')
    .add('/components/drawer', 'Drawer')
    .add('/components/message', 'Message')
    .add('/components/modal', 'Modal')
    .add('/components/notification', 'Notification')
    .add('/components/popconfirm', 'Popconfirm')
    .add('/components/progress', 'Progress')
    .add('/components/result', 'Result')
    .add('/components/skeleton', 'Skeleton')
    .add('/components/spin', 'Spin')
    .add('/components/anchor', 'Anchor')
    .add('/components/backtop', 'BackTop')
    .add('/components/configprovider', 'ConfigProvider')
    .unwrap()