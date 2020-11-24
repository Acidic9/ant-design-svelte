<script>
  import Router from './components/YrvRouter.svelte'
  import DemoMenu from './components/Menu.svelte'
  import {AntdSvelte} from './'
  const {Layout, Content, Row, Col, Sider, Header, Tag} = AntdSvelte
</script>

<style>
    :global(.demo-header) {
        color: #000;
        background: #fff;
        box-shadow: 0 2px 8px #f0f1f2;
        padding: 0 22px;
        margin-bottom: 12px;
    }

    :global(.demo-header > h1 > span:first-child) {
        font-size: 14px;
    }

    /* This is intended only for the first layout layer */
    :global(body > div > .ant-layout, body > div > .ant-layout > .ant-layout) {
        background: #fff;
    }

    :global(body > div > .ant-layout > .ant-layout:nth-child(2)) {
        min-height: inherit;
    }

    .demo-content {
        padding: 20px 72px;
        min-height: calc(100vh - 80px);
    }

    .demo-logo {
        position: relative;
        top: -1.5px;
        height: 32px;
        margin-right: 10px;
    }

    :global(.main-layout) {
        overflow-y: scroll;
        max-height: 100vh;
    }

    @media (min-width: 772px) {
        .demo-content {
            max-height: calc(100vh - 78px);
            overflow-y: scroll;
        }

        .main-layout {
            overflow-y: hidden;
        }

        :global(body > div > .ant-layout > .ant-layout:nth-child(2)) {
            min-height: calc(100vh - 64px);
        }
    }

    @media (max-width: 772px) {
        .demo-content {
            padding: 20px 32px;
        }
    }

    @media (max-width: 500px) {
        .demo-content {
            padding: 20px 24px;
        }
    }
</style>

<div class="main-layout">
    <Layout>
        <Header class="demo-header">
            <h1>
                <img alt="logo" src="assets/logo.png" class="demo-logo">
                <span>Ant Design Svelte</span>
                <Tag color="#FF4D4F" style={"margin-left: 8px;"}>Unofficial</Tag>
            </h1>
        </Header>
        <Layout hasSider={true} style="position: relative; min-height: calc(100vh - 64px); max-height: calc(100vh - 75px);">
            <Row style="width: 100%;">
                <Col xs={0} sm={0} md={6} xl={5} xxl={4}>
                    <Sider style="padding: 8px 0; background: #fff;">
                        <DemoMenu/>
                    </Sider>
                </Col>
                <Col xs={24} sm={24} md={18} xl={19} xxl={20}>
                    <div class="demo-content">
                        <Content>
                            <Router/>
                        </Content>
                    </div>
                </Col>
            </Row>
        </Layout>
    </Layout>
</div>