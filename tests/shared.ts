import type * as React from 'react'

export type {
    Affix,
    Alert,
    Anchor,
    AutoComplete,
    Avatar,
    BackTop,
    Badge,
    Breadcrumb,
    Button,
    Calendar,
    Card,
    Carousel,
    Cascader,
    Checkbox,
    Col,
    Collapse,
    Comment,
    ConfigProvider,
    DatePicker,
    Descriptions,
    Divider,
    Drawer,
    Dropdown,
    Empty,
    Form,
    Grid,
    Image,
    Input,
    InputNumber,
    Layout,
    List,
    Mentions,
    Menu,
    Modal,
    message,
    notification,
    PageHeader,
    Pagination,
    Popconfirm,
    Popover,
    Progress,
    Radio,
    Rate,
    Result,
    Row,
    Select,
    Skeleton,
    Slider,
    Space,
    Spin,
    Statistic,
    Steps,
    Switch,
    Table,
    Tabs,
    Tag,
    TimePicker,
    Timeline,
    Tooltip,
    Transfer,
    Tree,
    TreeSelect,
    Typography,
    Upload
} from 'antd'

/**
 * This is a simple type that allows us to import and use Ant Design types
 * without inheriting `React.HTMLAttributes<HTMLDivElement>`
 */
export type AntdSveltePropsDev<T> = Omit<T, keyof React.HTMLAttributes<HTMLDivElement>>
/**
 * This simple type is meant to mimic the expected options parameter when
 * using `new SvelteComponent(options)` which accept a generic type `T`
 * for defining prop types
 */
export type AntdSvelteProps<T> = {
    target: Element;
    anchor?: Element;
    props?: T;
    hydrate?: boolean;
    intro?: boolean;
    $$inline?: boolean;
}