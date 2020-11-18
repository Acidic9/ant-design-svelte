<script>
    import ReactWrapper from '../../utils/ReactWrapper.svelte'
    import {Titles, BasicTitles} from './Typography'
    import {Row, Col, Typography, AntdSvelteTitle} from '../../../'
    const {Title} = Typography
</script>

<Row>
    <div style="width: 100%;">
        <h1>Typography</h1>
        <p>Basic text writing, including headings, body text, lists, and more.</p>
        <h2>Basic styles</h2>
        <Row>
            <Col span={12}>
                <h3>Svelte</h3>
                <div>
                    <h1>h1. Ant Design</h1>
                    <h2>h2. Ant Design</h2>
                    <h3>h3. Ant Design</h3>
                    <h4>h4. Ant Design</h4>
                    <h5>h5. Ant Design</h5>
                </div>
            </Col>
            <Col span={12}>
                <h3>React</h3>
                <ReactWrapper component={BasicTitles}/>
            </Col>
        </Row>
        <br>
        <h2>Title component</h2>
        <Row>
            <Col span={12}>
                <h3>Svelte</h3>
                <div>
                    <Title>h1. Ant Design</Title>
                    <Title level={2}>h2. Ant Design</Title>
                    <Title level={3}>h3. Ant Design</Title>
                    <Title level={4}>h4. Ant Design</Title>
                    <Title level={5}>h5. Ant Design</Title>
                </div>
            </Col>
            <Col span={12}>
                <h3>React</h3>
                <ReactWrapper component={Titles}/>
            </Col>
        </Row>
        <br>
        <h2>Text component</h2>
        <Row>
            <Col span={12}>
                <h3>Svelte</h3>
                <div>
                    <AntdSvelteTitle>h1. Ant Design</AntdSvelteTitle>
                    <AntdSvelteTitle level={2}>h2. Ant Design</AntdSvelteTitle>
                    <AntdSvelteTitle level={3}>h3. Ant Design</AntdSvelteTitle>
                    <AntdSvelteTitle level={4}>h4. Ant Design</AntdSvelteTitle>
                    <AntdSvelteTitle level={5}>h5. Ant Design</AntdSvelteTitle>
                </div>
            </Col>
            <Col span={12}>
                <h3>React</h3>
                <ReactWrapper component={Titles}/>
            </Col>
        </Row>
    </div>
</Row>


